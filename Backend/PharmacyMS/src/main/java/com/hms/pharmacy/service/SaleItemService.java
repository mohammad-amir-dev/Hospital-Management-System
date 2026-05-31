package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.dto.SaleItemDTO;
import com.hms.pharmacy.exception.HmsException;

public interface SaleItemService {
    Long createSaleItem(SaleItemDTO saleItemDTO) throws HmsException;

    void createSaleItems(Long saleId, List<SaleItemDTO> saleItemDTOs) throws HmsException;

    void createMultipleSaleItem(Long saleId, Long medicineId, List<SaleItemDTO> saleItemDTOs) throws HmsException;

    void updateSaleItem(SaleItemDTO saleItemDTO) throws HmsException;

    List<SaleItemDTO> getSaleItemsBySaleId(Long saleId) throws HmsException;

    SaleItemDTO getSaleItem(Long id) throws HmsException;

}
