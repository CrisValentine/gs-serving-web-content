package com.example.servingwebcontent.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.servingwebcontent.genericservice.IGenericService;
import com.example.servingwebcontent.model.TaOperaciones;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * @author cescobar
 * fecha 06/07/2020
 * controller global para conexion entre microservicios.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Control de cambios
 * Fecha_______Autor_____Cambio
 *  
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

@RestController
@CrossOrigin(origins = "http://localhost:8080/")
@RequestMapping("/api/v1")
public class GenericCtrl {
	private Map<String, String> requestBody;
	private static final String GENERIC_CONTROLLER = "/genericController";
	@Autowired
	private IGenericService service;
	private String url = "";

	public GenericCtrl() {
		super();
	}

	@PostMapping("/tipoOperacion/{fiTipoDeAccion}/{numero1}/{numero2}")
	public ResponseEntity<HashMap<String, Object>> createTipoAcc(@PathVariable("fiTipoDeAccion") int fiTipoDeAccion,
			@PathVariable("numero1") int numero1, @RequestBody(required = false) @PathVariable("numero2") int numero2) {
		HashMap<String, Object> responseAdd = new HashMap<>();
		TaOperaciones ope = new TaOperaciones();
		try {
			if (fiTipoDeAccion == 1) {
				int[] arr = { numero1, numero2 };
				ope.setIdOperacion(fiTipoDeAccion);
				int resultado = Arrays.stream(arr).sum();
				Double doubleResult = Double.valueOf(resultado);
				ope.setResultadoOpe(doubleResult);
			}
			else if (fiTipoDeAccion == 2) {
				ope.setIdOperacion(fiTipoDeAccion);
				int resultado = Math.multiplyExact(numero1, 2);
				Double doubleResult = Double.valueOf(resultado);
				ope.setResultadoOpe(doubleResult);
			}
			else if (fiTipoDeAccion == 3) {
				ope.setIdOperacion(fiTipoDeAccion);
				Double doubleValue = Double.valueOf(numero1);
				Double resultado = Math.pow(doubleValue, 2l);
				ope.setResultadoOpe(resultado);
			}
			responseAdd = service.addTipoAcc(ope);
		} catch (Exception e) {
			System.out.println("Error: "+e.getMessage());
		}
		

		return new ResponseEntity<>(responseAdd, HttpStatus.CREATED);
	}
	

	@GetMapping("/tipoAccion/{fiTipoDeAccion}")
	public List<TaOperaciones> listarId(@PathVariable("fiTipoDeAccion") int fiTipoDeAccion) {
		return service.listar();
	}

}
