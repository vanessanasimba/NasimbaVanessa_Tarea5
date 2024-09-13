import { Component } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { UnidadmedidaService } from '../Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent {
  listaunidades: IUnidadMedida[] = [];

  constructor(private unidadServicio: UnidadmedidaService) {}
  ngOnInit(): void {
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
  }

  cargatabla() {
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
  }

  eliminar(idUnidad_Medida: number) {
    Swal.fire({
      title: 'Unidad de Medida',
      text: 'Esta seguro que desea eliminar la unida de medida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar unidad medida'
    }).then((result) => {
      if (result.isConfirmed) {
        this.unidadServicio.eliminar(idUnidad_Medida).subscribe((data) => {
          Swal.fire('Facturas', 'La unidad de medida ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
