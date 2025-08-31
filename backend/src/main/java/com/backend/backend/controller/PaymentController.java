package com.backend.backend.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.backend.backend.dto.PaymentRequest;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class PaymentController {

    @Autowired
    private APIContext apiContext;

    @Autowired
    private RestTemplate restTemplate;

    // @PostMapping("/api/paypal/createPayment")
    // public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest) {
    //     //TODO: process POST request
        
    //     Amount amount = new Amount();
    //     amount.setCurrency("USD");
    //     amount.setTotal(paymentRequest.getAmount());

    //     Transaction transaction = new Transaction();
    //     transaction.setAmount(amount);
    //     transaction.setDescription("Order Payment");

    //     List<Transaction> transactions = new ArrayList<>();
    //     transactions.add(transaction);

    //     Payer payer = new Payer();
    //     payer.setPaymentMethod("paypal");

    //     Payment payment = new Payment();
    //     payment.setIntent("sale");
    //     payment.setPayer(payer);
    //     payment.setTransactions(transactions);
    //     RedirectUrls redirectUrls = new RedirectUrls();
    //     redirectUrls.setCancelUrl("http://localhost:3000/cancel");
    //     redirectUrls.setReturnUrl("http://localhost:3000/success");
    //     payment.setRedirectUrls(redirectUrls);

    //     try {
    //         Payment created = payment.create(apiContext);

    // // Extract approval link
    //     String approvalLink = created.getLinks().stream()
    //         .filter(link -> "approval_url".equals(link.getRel()))
    //         .findFirst()
    //         .map(link -> link.getHref())
    //         .orElseThrow(() -> new RuntimeException("No approval URL returned from PayPal"));

    //     Map<String, String> response = new HashMap<>();
    //     response.put("id", created.getId());
    //     response.put("approvalUrl", approvalLink);

    //     return ResponseEntity.ok(response);
    //     } 
    //     catch (PayPalRESTException e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    //     }
    // }

    @PostMapping("/api/paypal/createPayment")
public ResponseEntity<?> createOrder(@RequestBody PaymentRequest paymentRequest) {
    try {
        // 1. Get OAuth Token
        String auth = Base64.getEncoder().encodeToString(("AUC6xUAnSjSD-k4PWFyVY-vnDEJacg-aaMg2ttYAzIuBOpt8osoQ5RP5t_ISlHhMp0xvWn-OdlMuhRBM:EG6faNlQmywHA1e7k8YUBSlZkmUhMs1bUQtcOHaU_AIyMG0SBk-Aul1uuTZ_xltQ2twK5waJFmTUnbbb").getBytes());
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.set("Authorization", "Basic " + auth);
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> tokenRequest = new HttpEntity<>("grant_type=client_credentials", tokenHeaders);
        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity("https://api-m.sandbox.paypal.com/v1/oauth2/token", tokenRequest, Map.class);
        String accessToken = tokenResponse.getBody().get("access_token").toString();

        // 2. Create Order
        HttpHeaders orderHeaders = new HttpHeaders();
        orderHeaders.setBearerAuth(accessToken);
        orderHeaders.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> orderPayload = Map.of(
            "intent", "CAPTURE",
            "purchase_units", List.of(Map.of(
                "amount", Map.of(
                    "currency_code", "USD",
                    "value", paymentRequest.getAmount()
                )
            ))
        );

        HttpEntity<Map<String, Object>> orderRequest = new HttpEntity<>(orderPayload, orderHeaders);
        ResponseEntity<Map> orderResponse = restTemplate.postForEntity("https://api-m.sandbox.paypal.com/v2/checkout/orders", orderRequest, Map.class);

        return ResponseEntity.ok(orderResponse.getBody());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to create order", "details", e.getMessage()));
    }
}
    
    
}
