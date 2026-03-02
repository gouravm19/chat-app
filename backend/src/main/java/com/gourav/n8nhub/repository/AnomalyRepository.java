package com.gourav.n8nhub.repository;

import com.gourav.n8nhub.model.Anomaly;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnomalyRepository extends JpaRepository<Anomaly, Long> {}
