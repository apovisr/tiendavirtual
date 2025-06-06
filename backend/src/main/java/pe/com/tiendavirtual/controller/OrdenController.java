package pe.com.tiendavirtual.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.tiendavirtual.modelo.ItemOrden;
import pe.com.tiendavirtual.modelo.Orden;
import pe.com.tiendavirtual.service.OrdenService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {
    private final OrdenService ordenService;

    public OrdenController(OrdenService ordenService) {
        this.ordenService = ordenService;
    }

    @GetMapping
    public List<Orden> listar() {
        return ordenService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orden> obtenerPorId(@PathVariable Long id) {
        Optional<Orden> orden = ordenService.obtenerPorId(id);
        return orden.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/carrito/{carritoId}")
    public List<Orden> listarPorCarritoId(@PathVariable Long carritoId) {
        return ordenService.listarPorCarritoId(carritoId);
    }

    @PostMapping
    public ResponseEntity<Orden> crear(@RequestBody Orden orden) {
        if (orden.getItems() != null) {
            for (ItemOrden item : orden.getItems()) {
                item.setOrden(orden); // set the parent reference
            }
        }
        Orden nuevaOrden = ordenService.guardar(orden);
        return ResponseEntity.ok(nuevaOrden);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orden> actualizar(@PathVariable Long id, @RequestBody Orden ordenActualizada) {
        Optional<Orden> ordenExistente = ordenService.obtenerPorId(id);
        if (ordenExistente.isPresent()) {
            ordenActualizada.setId(id);
            if (ordenActualizada.getItems() != null) {
                for (ItemOrden item : ordenActualizada.getItems()) {
                    item.setOrden(ordenActualizada);
                }
            }
            Orden actualizada = ordenService.guardar(ordenActualizada);
            return ResponseEntity.ok(actualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ordenService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
