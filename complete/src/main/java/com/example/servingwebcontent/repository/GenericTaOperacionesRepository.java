package com.example.servingwebcontent.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import com.example.servingwebcontent.model.TaOperaciones;

public interface GenericTaOperacionesRepository extends Repository<TaOperaciones, Integer> {
	
	List<TaOperaciones> findAll();
	
	TaOperaciones save(TaOperaciones operacion);

}
