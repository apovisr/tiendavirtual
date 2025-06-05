package pe.com.tiendavirtual.service;

import org.springframework.stereotype.Service;
import pe.com.tiendavirtual.modelo.Carrito;
import pe.com.tiendavirtual.repositorio.CarritoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {
    private final CarritoRepository carritoRepository;

    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    public List<Carrito> listarTodos() {
        return carritoRepository.findAll();
    }

    public Optional<Carrito> obtenerPorId(Long id) {
        return carritoRepository.findById(id);
    }

    public Carrito guardar(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public void eliminar(Long id) {
        carritoRepository.deleteById(id);
    }

    public List<Carrito> listarPorClienteId(Long clienteId) {
        return carritoRepository.findByClienteId(clienteId);
    }
}
