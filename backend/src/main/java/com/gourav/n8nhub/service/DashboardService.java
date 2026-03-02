package com.gourav.n8nhub.service;

import com.gourav.n8nhub.model.WorkflowExecution;
import com.gourav.n8nhub.repository.WorkflowExecutionRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {
  private final WorkflowExecutionRepository executionRepository;

  public DashboardService(WorkflowExecutionRepository executionRepository) {
    this.executionRepository = executionRepository;
  }

  public Map<String, Object> overview() {
    List<WorkflowExecution> all = executionRepository.findAll();
    long success = all.stream().filter(e -> "SUCCESS".equalsIgnoreCase(e.getStatus())).count();
    double avgDuration = all.stream().map(WorkflowExecution::getDurationMs).filter(d -> d != null).mapToDouble(Double::doubleValue).average().orElse(0);

    Map<String, Object> data = new HashMap<>();
    data.put("totalExecutions", all.size());
    data.put("successRate", all.isEmpty() ? 0 : (success * 100.0 / all.size()));
    data.put("avgDuration", avgDuration);
    data.put("activeWorkflows", 8);
    data.put("recentExecutions", executionRepository.findTop50ByOrderByCreatedAtDesc());
    return data;
  }
}
