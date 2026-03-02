package com.gourav.n8nhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Anomaly {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String metric;
  private Double value;
  private Double expected;
  private Double deviation;
  private String severity;
  @Column(columnDefinition = "TEXT")
  private String explanation;
  private boolean reviewed = false;
  private Instant createdAt = Instant.now();
  public Long getId() { return id; }
  public String getMetric() { return metric; }
  public void setMetric(String metric) { this.metric = metric; }
  public Double getValue() { return value; }
  public void setValue(Double value) { this.value = value; }
  public Double getExpected() { return expected; }
  public void setExpected(Double expected) { this.expected = expected; }
  public Double getDeviation() { return deviation; }
  public void setDeviation(Double deviation) { this.deviation = deviation; }
  public String getSeverity() { return severity; }
  public void setSeverity(String severity) { this.severity = severity; }
  public String getExplanation() { return explanation; }
  public void setExplanation(String explanation) { this.explanation = explanation; }
  public boolean isReviewed() { return reviewed; }
  public void setReviewed(boolean reviewed) { this.reviewed = reviewed; }
  public Instant getCreatedAt() { return createdAt; }
}
