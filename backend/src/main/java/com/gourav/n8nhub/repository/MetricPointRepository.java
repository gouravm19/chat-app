package com.gourav.n8nhub.repository;

import com.gourav.n8nhub.model.MetricPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface MetricPointRepository extends JpaRepository<MetricPoint, Long> {
  List<MetricPoint> findByCreatedAtAfterOrderByCreatedAtDesc(Instant after);
}
