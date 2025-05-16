package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.tiendavirtual.modelo.Carrito;

import java.util.List;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    List<Carrito> findByClienteId(Long clienteId);
}
