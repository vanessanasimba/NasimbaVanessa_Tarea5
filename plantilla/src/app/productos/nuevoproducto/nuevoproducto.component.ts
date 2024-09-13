import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iiva } from 'src/app/Interfaces/iIva';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IvaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIva: Iiva [] = [];
  titulo = '';
  frm_Producto: FormGroup;
  idProducto = 0;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaServicio:IvaService,
    private productoServicio:ProductoService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.crearFormulario();

    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaServicio.todos().subscribe((data) => (this.listaIva = data));

    this.idProducto = parseInt(this.ruta.snapshot.paramMap.get('id'));
    if (this.idProducto > 0) {
      this.productoServicio.uno(this.idProducto).subscribe((x) => {
        this.frm_Producto.controls['Codigo_Barras'].setValue(x.Codigo_Barras);
        this.frm_Producto.controls['Nombre_Producto'].setValue(x.Nombre_Producto);
        this.frm_Producto.controls['Graba_IVA'].setValue(x.Graba_IVA);
        this.frm_Producto.controls['Unidad_Medida_idUnidad_Medida'].setValue(x.Unidad_Medida_idUnidad_Medida);
        this.frm_Producto.controls['IVA_idIVA'].setValue(x.IVA_idIVA);
        this.frm_Producto.controls['Cantidad'].setValue(x.Cantidad);
        this.frm_Producto.controls['Valor_Compra'].setValue(x.Valor_Compra);
        this.frm_Producto.controls['Valor_Venta'].setValue(x.Valor_Venta);
        this.frm_Producto.controls['Proveedores_idProveedores'].setValue(x.Proveedores_idProveedores);
        this.titulo = 'Editar Producto';
      });
    }
    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }

  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }

  grabar() {
    let producto: IProducto= {
      Codigo_Barras: this.frm_Producto.value.Codigo_Barras,
      Nombre_Producto: this.frm_Producto.value.Nombre_Producto,
      Graba_IVA: this.frm_Producto.value.Graba_IVA,
      Unidad_Medida_idUnidad_Medida: this.frm_Producto.value.Unidad_Medida_idUnidad_Medida,
      IVA_idIVA: this.frm_Producto.value.IVA_idIVA,
      Cantidad: this.frm_Producto.value.Cantidad,
      Valor_Compra: this.frm_Producto.value.Valor_Compra,
      Valor_Venta: this.frm_Producto.value.Valor_Venta,
      Proveedores_idProveedores: this.frm_Producto.value.Proveedores_idProveedores
    };
     if (this.idProducto == 0 || isNaN(this.idProducto)){
      this.productoServicio.insertar(producto).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          Swal.fire('Exito', 'El producto se grabo con exito', 'success');
          this.navegacion.navigate(['/productos']);
        }
      });
     } else{
      producto.idProductos = this.idProducto;
      this.productoServicio.actualizar(producto).subscribe((respuesta) => {
        Swal.fire('Exito', 'El producto se modifico con exito', 'success');
        this.navegacion.navigate(['/productos']);
      });
     }

  }

  cambioUnidadMedida(objetoSleect: any) {
    let idUnidad_Medida = objetoSleect.target.value;
    this.frm_Producto.get('Unidad_Medida_idUnidad_Medida')?.setValue(idUnidad_Medida);
  }

  cambioProveedor(objetoSleect: any) {
    let idProveedores = objetoSleect.target.value;
    this.frm_Producto.get('Proveedores_idProveedores')?.setValue(idProveedores);
  }
}
