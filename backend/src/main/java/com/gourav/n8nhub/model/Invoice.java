package com.gourav.n8nhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Invoice {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String vendorName;
  private String invoiceNumber;
  private Double totalAmount;
  private String currency;
  private String status = "PROCESSED";
  @Column(columnDefinition = "TEXT")
  private String rawPayload;
  private Instant createdAt = Instant.now();
  public Long getId() { return id; }
  public String getVendorName() { return vendorName; }
  public void setVendorName(String vendorName) { this.vendorName = vendorName; }
  public String getInvoiceNumber() { return invoiceNumber; }
  public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
  public Double getTotalAmount() { return totalAmount; }
  public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
  public String getCurrency() { return currency; }
  public void setCurrency(String currency) { this.currency = currency; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public String getRawPayload() { return rawPayload; }
  public void setRawPayload(String rawPayload) { this.rawPayload = rawPayload; }
  public Instant getCreatedAt() { return createdAt; }
}
