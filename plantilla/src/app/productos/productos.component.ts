import { Component, OnInit } from '@angular/core';
import { IProducto } from '../Interfaces/iproducto';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { ProductoService } from '../Services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink,SharedModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  listaproductos : IProducto[] =[];

  constructor(private productoServicio: ProductoService){}

  ngOnInit(): void {
   this.cargarProductos();
  }

  cargarProductos(){
    this.productoServicio.todos().subscribe((data: IProducto[])=>{
      this.listaproductos = data;
    });
  }
  
  trackByFn(){}

  eliminar(idProductos) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoServicio.eliminar(idProductos).subscribe((data) => {
          this.cargarProductos();
        });
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
      } else {
        Swal.fire('Error', 'Ocurrio un erro', 'error');
      }
    });
  }

}
