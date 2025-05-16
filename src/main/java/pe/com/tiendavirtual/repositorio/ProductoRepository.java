package pe.com.tiendavirtual.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.tiendavirtual.modelo.Producto;

@Repository
public interface ProductoRepository  extends JpaRepository<Producto, Long> {
}
