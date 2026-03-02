package com.gourav.n8nhub.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gourav.n8nhub.dto.ApiResponse;
import com.gourav.n8nhub.model.*;
import com.gourav.n8nhub.repository.*;
import com.gourav.n8nhub.service.DashboardService;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {
  private final WorkflowExecutionRepository executions;
  private final MetricPointRepository metrics;
  private final InvoiceRepository invoices;
  private final AnomalyRepository anomalies;
  private final DashboardService dashboardService;
  private final ObjectMapper mapper = new ObjectMapper();

  public ApiController(WorkflowExecutionRepository executions, MetricPointRepository metrics, InvoiceRepository invoices,
                       AnomalyRepository anomalies, DashboardService dashboardService) {
    this.executions = executions;
    this.metrics = metrics;
    this.invoices = invoices;
    this.anomalies = anomalies;
    this.dashboardService = dashboardService;
  }

  @PostMapping("/webhook-data/save")
  public ApiResponse saveWebhookData(@RequestBody Map<String, Object> payload) throws JsonProcessingException {
    WorkflowExecution e = new WorkflowExecution();
    e.setWorkflowName((String) payload.getOrDefault("workflowName", "Unknown Workflow"));
    e.setStatus((String) payload.getOrDefault("status", "SUCCESS"));
    e.setDurationMs(Double.valueOf(String.valueOf(payload.getOrDefault("durationMs", 0.0))));
    e.setPayload(mapper.writeValueAsString(payload));
    return ApiResponse.ok(executions.save(e), "Webhook data saved");
  }

  @GetMapping("/metrics/recent")
  public ApiResponse recentMetrics(@RequestParam(defaultValue = "10") long minutes) {
    return ApiResponse.ok(metrics.findByCreatedAtAfterOrderByCreatedAtDesc(Instant.now().minus(minutes, ChronoUnit.MINUTES)), "Recent metrics");
  }

  @PostMapping("/metrics/save")
  public ApiResponse saveMetric(@RequestBody Map<String, Object> body) {
    MetricPoint point = new MetricPoint();
    point.setMetric(String.valueOf(body.getOrDefault("metric", "generic.metric")));
    point.setValue(Double.valueOf(String.valueOf(body.getOrDefault("value", 0.0))));
    point.setSeverity(String.valueOf(body.getOrDefault("severity", "LOW")));
    return ApiResponse.ok(metrics.save(point), "Metric saved");
  }

  @PostMapping("/incidents/log")
  public ApiResponse incident(@RequestBody Map<String, Object> body) throws JsonProcessingException {
    WorkflowExecution e = new WorkflowExecution();
    e.setWorkflowName("API Health Monitor");
    e.setStatus("INCIDENT");
    e.setDurationMs(0.0);
    e.setPayload(mapper.writeValueAsString(body));
    return ApiResponse.ok(executions.save(e), "Incident logged");
  }

  @GetMapping("/workflows/stats")
  public ApiResponse workflowStats() {
    return ApiResponse.ok(dashboardService.overview(), "Workflow stats");
  }

  @GetMapping("/workflows/recent")
  public ApiResponse workflowRecent() {
    return ApiResponse.ok(executions.findTop50ByOrderByCreatedAtDesc(), "Recent workflow executions");
  }

  @PostMapping(value = "/pdf/extract-text", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ApiResponse extractText(@RequestPart("file") MultipartFile file) throws Exception {
    String text = new String(file.getBytes(), StandardCharsets.UTF_8);
    return ApiResponse.ok(Map.of("text", text.substring(0, Math.min(5000, text.length()))), "Mock PDF text extraction complete");
  }

  @PostMapping("/invoices/save")
  public ApiResponse saveInvoice(@RequestBody Map<String, Object> body) throws JsonProcessingException {
    Invoice invoice = new Invoice();
    invoice.setVendorName(String.valueOf(body.getOrDefault("vendorName", "Unknown Vendor")));
    invoice.setInvoiceNumber(String.valueOf(body.getOrDefault("invoiceNumber", "N/A")));
    invoice.setCurrency(String.valueOf(body.getOrDefault("currency", "USD")));
    invoice.setTotalAmount(Double.valueOf(String.valueOf(body.getOrDefault("totalAmount", 0.0))));
    invoice.setStatus(String.valueOf(body.getOrDefault("status", "PROCESSED")));
    invoice.setRawPayload(mapper.writeValueAsString(body));
    return ApiResponse.ok(invoices.save(invoice), "Invoice saved");
  }

  @GetMapping("/invoices")
  public ApiResponse listInvoices() { return ApiResponse.ok(invoices.findAll(), "Invoices list"); }

  @GetMapping("/anomalies")
  public ApiResponse listAnomalies() { return ApiResponse.ok(anomalies.findAll(), "Anomalies list"); }

  @PostMapping("/anomalies/save")
  public ApiResponse saveAnomaly(@RequestBody Map<String, Object> body) {
    Anomaly a = new Anomaly();
    a.setMetric(String.valueOf(body.getOrDefault("metric", "unknown")));
    a.setValue(Double.valueOf(String.valueOf(body.getOrDefault("value", 0.0))));
    a.setExpected(Double.valueOf(String.valueOf(body.getOrDefault("expected", 0.0))));
    a.setDeviation(Double.valueOf(String.valueOf(body.getOrDefault("deviation", 0.0))));
    a.setSeverity(String.valueOf(body.getOrDefault("severity", "LOW")));
    a.setExplanation(String.valueOf(body.getOrDefault("explanation", "No explanation")));
    return ApiResponse.ok(anomalies.save(a), "Anomaly saved");
  }

  @GetMapping("/dashboard/overview")
  public ApiResponse dashboardOverview() { return ApiResponse.ok(dashboardService.overview(), "Dashboard overview"); }
}
