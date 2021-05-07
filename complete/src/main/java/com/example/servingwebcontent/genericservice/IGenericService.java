package com.example.servingwebcontent.genericservice;

import java.util.HashMap;
import java.util.List;

import com.example.servingwebcontent.model.TaOperaciones;



public interface IGenericService {

	
	
	HashMap<String, Object> addTipoAcc(TaOperaciones operacion);
	
	List<TaOperaciones> listar();
}
