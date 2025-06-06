package pe.com.tiendavirtual.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.com.tiendavirtual.modelo.ItemOrden;
import pe.com.tiendavirtual.modelo.Orden;
import pe.com.tiendavirtual.repositorio.OrdenRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenService {

    private final OrdenRepository ordenRepository;

    public OrdenService(OrdenRepository ordenRepository) {
        this.ordenRepository = ordenRepository;
    }

    public List<Orden> listarTodos() {
        return ordenRepository.findAll();
    }

    public Optional<Orden> obtenerPorId(Long id) {
        return ordenRepository.findById(id);
    }

    public List<Orden> listarPorCarritoId(Long carritoId) {
        return ordenRepository.findByCarritoId(carritoId);
    }

    public Orden guardar(Orden orden) {
        // CascadeType.ALL ensures items will be persisted
        return ordenRepository.save(orden);
    }

    @Transactional
    public Orden actualizar(Long id, Orden ordenActualizada) {
        return ordenRepository.findById(id).map(ordenExistente -> {
            ordenExistente.setNumero(ordenActualizada.getNumero());
            ordenExistente.setFecha(ordenActualizada.getFecha());
            ordenExistente.setSubTotal(ordenActualizada.getSubTotal());
            ordenExistente.setIgv(ordenActualizada.getIgv());
            ordenExistente.setTotal(ordenActualizada.getTotal());
            ordenExistente.setCarrito(ordenActualizada.getCarrito());

            ordenExistente.getItems().clear();
            for (ItemOrden item : ordenActualizada.getItems()) {
                item.setOrden(ordenExistente);
                ordenExistente.getItems().add(item);
            }

            return ordenRepository.save(ordenExistente);
        }).orElseThrow(() -> new RuntimeException("Orden no encontrada con id " + id));
    }

    public void eliminar(Long id) {
        ordenRepository.deleteById(id);
    }
}
