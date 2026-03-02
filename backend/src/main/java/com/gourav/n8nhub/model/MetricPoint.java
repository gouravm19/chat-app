package com.gourav.n8nhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class MetricPoint {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String metric;
  private Double value;
  private String severity;
  private Instant createdAt = Instant.now();
  public Long getId() { return id; }
  public String getMetric() { return metric; }
  public void setMetric(String metric) { this.metric = metric; }
  public Double getValue() { return value; }
  public void setValue(Double value) { this.value = value; }
  public String getSeverity() { return severity; }
  public void setSeverity(String severity) { this.severity = severity; }
  public Instant getCreatedAt() { return createdAt; }
}
