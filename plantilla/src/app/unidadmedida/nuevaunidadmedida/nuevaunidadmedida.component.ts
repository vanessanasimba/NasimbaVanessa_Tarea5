import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedida.component.html',
  styleUrl: './nuevaunidadmedida.component.scss'
})
export class NuevaunidadmedidaComponent implements OnInit{
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida: FormGroup;

  idUnidadMedida = 0;
  constructor(
    private unidadService: UnidadmedidaService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required])
    });
    this.idUnidadMedida = parseInt(this.ruta.snapshot.paramMap.get('id'));
    if (this.idUnidadMedida > 0) {
      this.unidadService.uno(this.idUnidadMedida).subscribe((x) => {
        this.frm_UnidadMedida.get('Detalle')?.setValue(x.Detalle);
        this.frm_UnidadMedida.get('Tipo')?.setValue(x.Tipo);
      });
    }
  }

  cambio(objetoSleect: any) {
    this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
  }
  grabar() {
    let unidadmedida: IUnidadMedida = {
      Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
      Tipo: this.frm_UnidadMedida.get('Tipo')?.value
    };
    if (this.idUnidadMedida == 0 || isNaN(this.idUnidadMedida)) {
      this.unidadService.insertar(unidadmedida).subscribe((x) => {
        if (parseInt(x) > 0) {
          Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
          this.navegacion.navigate(['/unidadmedida']);
        }
      });
    } else {
      unidadmedida.idUnidad_Medida = this.idUnidadMedida;
      this.unidadService.actualizar(unidadmedida).subscribe((x) => {
        Swal.fire('Exito', 'La unidad de medida se modifico con exito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}
