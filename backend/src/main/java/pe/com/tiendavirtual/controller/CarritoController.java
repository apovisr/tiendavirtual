package pe.com.tiendavirtual.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.tiendavirtual.modelo.Carrito;
import pe.com.tiendavirtual.service.CarritoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {
    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @GetMapping
    public List<Carrito> listar() {
        return carritoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtenerPorId(@PathVariable Long id) {
        Optional<Carrito> carrito = carritoService.obtenerPorId(id);
        return carrito.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Carrito> crear(@RequestBody Carrito carrito) {
        Carrito nuevoCarrito = carritoService.guardar(carrito);
        return ResponseEntity.ok(nuevoCarrito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carrito> actualizar(@PathVariable Long id, @RequestBody Carrito carritoActualizado) {
        Optional<Carrito> carritoExistente = carritoService.obtenerPorId(id);
        if (carritoExistente.isPresent()) {
            carritoActualizado.setId(id);
            return ResponseEntity.ok(carritoService.guardar(carritoActualizado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        carritoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
