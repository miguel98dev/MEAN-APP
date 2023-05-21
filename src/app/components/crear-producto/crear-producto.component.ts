import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{

  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: String | null;

  
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private productoService: ProductoService, private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      origen: ['', Validators.required],
      precio: ['', Validators.required]
    })

    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
      this.esEdit();
  }

  agregarProducto() {

    const producto: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      origen: this.productoForm.get('origen')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if (this.id !== null) {
      // editamos producto

      this.productoService.editProducto(this.id, producto).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito', 'Producto modificado'); // toastr
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    } else {
      // agregamos producto

      this.productoService.saveProducto(producto).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito', 'Producto registrado'); // toastr
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }

    console.log(producto);

    
    
  }

  esEdit() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          origen: data.origen,
          precio: data.precio 
        })
      })
    }
  }

}
