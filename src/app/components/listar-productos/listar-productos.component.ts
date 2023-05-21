import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{

  listProductos: Producto[] = [];

  constructor(private productoService: ProductoService, private toastr: ToastrService) {}

  ngOnInit(): void {
      this.obtenerProductos();
  }

  // obtenerProductos() {
  //   this.productoService.getProductos().subscribe(data => {
  //     console.log(data);
  //     this.listProductos = data;
  //   }, error => {
  //       console.log(error);
  //   })
  // }

  deleteProducto(id: any) {
    if (confirm('¿Quieres eliminar el producto?') == true ) {
        this.productoService.deleteProducto(id).subscribe(data => {
        this.toastr.error('El producto fue eliminado con éxito', 'Producto eliminado');
        this.obtenerProductos();
      }, error => {
        console.log(error);
      })
    }
    
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(data => {
      next: this.listProductos = data,
      Error; (error: any) => {
        console.log(error);
      }
    }  )
  }
}



