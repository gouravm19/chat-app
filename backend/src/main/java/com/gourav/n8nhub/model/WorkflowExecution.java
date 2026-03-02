package com.gourav.n8nhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class WorkflowExecution {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String workflowName;
  private String status;
  private Double durationMs;
  @Column(columnDefinition = "TEXT")
  private String payload;
  private Instant createdAt = Instant.now();

  public Long getId() { return id; }
  public String getWorkflowName() { return workflowName; }
  public void setWorkflowName(String workflowName) { this.workflowName = workflowName; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public Double getDurationMs() { return durationMs; }
  public void setDurationMs(Double durationMs) { this.durationMs = durationMs; }
  public String getPayload() { return payload; }
  public void setPayload(String payload) { this.payload = payload; }
  public Instant getCreatedAt() { return createdAt; }
}
