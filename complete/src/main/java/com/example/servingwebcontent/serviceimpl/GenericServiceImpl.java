package com.example.servingwebcontent.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.servingwebcontent.genericservice.IGenericService;
import com.example.servingwebcontent.model.TaOperaciones;
import com.example.servingwebcontent.repository.GenericTaOperacionesRepository;

@Service
public class GenericServiceImpl implements IGenericService {
	
	@Autowired
	GenericTaOperacionesRepository repo;

	@Override
	public HashMap<String, Object> addTipoAcc(TaOperaciones operacion) {
		HashMap hash = new HashMap<>();
		List<TaOperaciones> lista = new ArrayList<>();
		
		try {
			TaOperaciones saveAccion = repo.save(operacion);
			if(saveAccion!=null) {
				hash.put("mensaje", "guardado");
				hash.put("success", true);
				
				lista = repo.findAll();
				
				for (int i = 0; i < lista.size(); i++) {
					
					String val="";
					
					if(lista.get(i).getIdOperacion().toString().equals("1")) {
						val = "SUMA";
					}else if(lista.get(i).getIdOperacion().toString().equals("2")) {
						val = "MULTIPLICACION";
					}else if(lista.get(i).getIdOperacion().toString().equals("3")) {
						val = "EXPONENCIACION";
					}
					
					hash.put("ID REGISTRO: "+ lista.get(i).getIdOperacion() , lista.get(i).getIdOperacion());
					hash.put("RESULTADO DE LA OPERACION "+val, lista.get(i).getResultadoOpe());
				}
				
			}
		}catch (Exception e) {
			hash.put("mensaje", e.getMessage());
			hash.put("success", false);
			System.out.println("Error: "+e.getMessage());
		}
		
		
		return hash;
	}

	@Override
	public List<TaOperaciones> listar() {
		return repo.findAll();
	}

}
