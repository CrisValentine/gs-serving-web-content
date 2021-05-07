package com.example.servingwebcontent.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "TAOPERACIONES")
public class TaOperaciones {
	
	@Id
	@Column(name = "IDOPERACION")
	private Integer  idOperacion;
	
	@Column(name = "RESULTADOOPE")
	private Double  resultadoOpe;

	public Integer getIdOperacion() {
		return idOperacion;
	}

	public Double getResultadoOpe() {
		return resultadoOpe;
	}

	public void setIdOperacion(Integer idOperacion) {
		this.idOperacion = idOperacion;
	}

	public void setResultadoOpe(Double resultadoOpe) {
		this.resultadoOpe = resultadoOpe;
	}

}
