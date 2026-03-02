package com.gourav.n8nhub.repository;

import com.gourav.n8nhub.model.WorkflowExecution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkflowExecutionRepository extends JpaRepository<WorkflowExecution, Long> {
  List<WorkflowExecution> findTop50ByOrderByCreatedAtDesc();
}
