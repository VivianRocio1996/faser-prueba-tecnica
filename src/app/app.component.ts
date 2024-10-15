import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[] = [];  // Listado de tareas
	nuevaTareaTitulo: string = '';  // Título de la nueva tarea
	nuevaTareaMinutos: number = 0;  // Duración de la nueva tarea en minutos
	private idCounter = 1; // Contador para asignar IDs únicos
	tareasSeleccionadas: Tarea[] = []; // Almacena las tareas seleccionadas
    ordenAscendente: boolean = true; // Estado de ordenación
	constructor(
		public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();  // Cargar las tareas al iniciar el componente
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();  // Obtener tareas del servicio
	}

	// Requerimiento 2: Agregar una nueva tarea
	agregarTarea() {
		if (this.nuevaTareaTitulo.trim() && this.nuevaTareaMinutos > 0) {
			const nuevaTarea: Tarea = {
				id: this.idCounter++,  // Asignar un ID único
				titulo: this.nuevaTareaTitulo,
				minutos: this.nuevaTareaMinutos
			};
			this.tareas.push(nuevaTarea);  // Añadir la nueva tarea al listado
			this.limpiarFormulario();      // Limpiar el formulario después de agregar la tarea
		}
	}

	// Función para limpiar los campos del formulario
	limpiarFormulario() {
		this.nuevaTareaTitulo = '';  // Reiniciar el título
		this.nuevaTareaMinutos = 0;  // Reiniciar los minutos
	}

	// Requerimiento 3: Función para manejar la selección de tareas
	toggleTareaSeleccionada(tarea: Tarea) {
		const index = this.tareasSeleccionadas.indexOf(tarea);
		if (index === -1) {
			this.tareasSeleccionadas.push(tarea);
		} else {
			this.tareasSeleccionadas.splice(index, 1);
		}
	}
	// Requerimiento 4: Función para eliminar tareas seleccionadas
	eliminarTareasSeleccionadas() {
		this.tareas = this.tareas.filter(tarea => !this.tareasSeleccionadas.includes(tarea)); // Filtrar las tareas no seleccionadas
		this.tareasSeleccionadas = []; // Limpiar la lista de tareas seleccionadas
	}
	// Requerimiento 5: Función para ordenar tareas
	ordenarTareas(propiedad: string) {
		this.ordenAscendente = !this.ordenAscendente; // Cambiar el estado de ordenación
		this.tareas.sort((a, b) => {
			if (a[propiedad] < b[propiedad]) {
				return this.ordenAscendente ? -1 : 1; // Orden ascendente o descendente
			}
			if (a[propiedad] > b[propiedad]) {
				return this.ordenAscendente ? 1 : -1; // Orden ascendente o descendente
			}
			return 0;
		});
	}
}