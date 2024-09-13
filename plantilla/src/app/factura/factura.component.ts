import { Component } from '@angular/core';
import { IFactura } from '../Interfaces/factura';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { FacturaService } from '../Services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [RouterLink,SharedModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent {
  listafacturas: IFactura[] = [];
  constructor(private facturaServicio: FacturaService) {}
  ngOnInit(): void {
    this.facturaServicio.todos().subscribe((data: IFactura[]) => {
      this.listafacturas = data;
    });
  }

  cargatabla() {
    this.facturaServicio.todos().subscribe((data: IFactura[]) => {
      this.listafacturas = data;
    });
  }

  eliminar(idFactura) {
    Swal.fire({
      title: 'Factura',
      text: 'Esta seguro que desea eliminar la  factura!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Factura'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaServicio.eliminar(idFactura).subscribe((data) => {
          Swal.fire('Facturas', 'La factura ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }


}
