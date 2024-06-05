import { Request, Response } from 'express';
import Together from "together-ai";
import dotenv from 'dotenv';

dotenv.config();

export const homeController = async (req: Request, res: Response): Promise<void> => {
// console.log("ghere")
  const text=`InvoiceData:ORIGINAL
  TAX INVOICE
  ANALOG ECLIPSE
  
  # AETI2324/0119
  
  D-803, MALABAR COUNTY - 1,
  NR NIRMA SCHOOL,
  Balance Due
  Ahmedabad Gujarat 382481,
  ₹19,87,120.00
  India,
  GSTIN 24BXEPP6806K1Z7,
  Bill To
  SILVER TOUCH TECHNOLOGIES LIMITED
  2ND FLOOR, SAFFRON BUILDING
  NR. PANCHWATI CIRCLE
  Ahmedabad
  380006 Gujarat
  India
  GSTIN 24AACCS6474P1ZR
  Ship To
  SILVER TOUCH TECHNOLOGIES
  LIMITED Invoice Date : 29-03-2024
  B-2 Soham Avenue, Soham Park
  Society Terms : Due on Receipt
  Nr. Vastrapur Lake
  Ahmedabad Due Date : 29-03-2024
  380015 Gujarat
  Sales person : Udit Panchasara
  India
  Place Of Supply: Gujarat (24)
  
  # Item & Description HSN/SAC Qty Rate CGST SGST Amount
  
  1 Evota 98 inch ADPM Interactive 84714900 1.00 3,95,000 35,550.00 35,550.00 3,95,000.00
  Flat Panel .00 9% 9%
  Model: EVLFD98ST
  S/N: 68240124002343
  2 OPS Core i5, 8 GB RAM, 128 GB 84715000 1.00 25,000.0 2,250.00 2,250.00 25,000.00
  SSD, Bluetooth, Wifi 0 9% 9%
  S/N: 0823OPSI50035
  3 Evota 12x 4K PTZ Camera with 85258090 1.00 95,000.0 8,550.00 8,550.00 95,000.00
  Model: C12HUL 0 9% 9%
  S/N: 1123C12HUL0110
  4 Clearone Ceiling Tile BMA 360 85181000 2.00 3,15,000 56,700.00 56,700.00 6,30,000.00
  S/N: 6212-2329-40, 6494-2329-40 .00 9% 9%
  5 Clearone CONVERGE Pro 2 48VT 85176290 1.00 2,40,000 21,600.00 21,600.00 2,40,000.00
  S/N: 8284-2334-40 .00 9% 9%
  6 Clearone COLLABORATE Versa 85176290 1.00 25,000.0 2,250.00 2,250.00 25,000.00
  Hub 0 9% 9%
  S/N: 1022-2147-26
  7 SAMSUNG TAB S7FE T735NZSE 6 847131 1.00 20,000.0 1,800.00 1,800.00 20,000.00
  /128 SILVER 0 9% 9%
  S/N: 350530151477157
  1# Item & Description HSN/SAC Qty Rate CGST SGST Amount
  8 Clearone Ceiling Speakers (Pair of 85182100 4.00 48,000.0 17,280.00 17,280.00 1,92,000.00
  2 speakers) 0 9% 9%
  S/N: 0618-2325-33, 0610-2325-33,
  0581-2325-33, 0717-2325-33
  9 Clearone 90w POE power supply 85044090 2.00 22,000.0 3,960.00 3,960.00 44,000.00
  S/N: TT24-24122, TT24-24123 0 9% 9%
  10 AV PACK - Necessary Cables and 854442 1.00 18,000.0 1,620.00 1,620.00 18,000.00
  Connectors 0 9% 9%
  (Installation of supplied
  equipment included)
  Sub Total 16,84,000.00
  CGST9 (9%) 1,51,560.00
  SGST9 (9%) 1,51,560.00
  Total ₹19,87,120.00
  Balance Due ₹19,87,120.00
  Total In Words: Indian Rupee Nineteen Lakh
  Eighty-Seven Thousand One
  Hundred Twenty Only
  Notes
  PO Reference: AMPO2402/310 (Date: 21/02/2024)
  Thanks for your business.
  Bank Name : IndusInd BANK
  A/C Name: Analog Eclipse
  A/C Number : 259988998825 (Current A/C)
  Branch & IFSC : Godrej Garden City, Ahmedabad & INDB0001624
  Terms & Conditions
  [1] Manufacturers warranty for all the products 1 year (Limited) or as per mentioned in the product details (The equipment should always be
  used through a stabilized power supply. Any damage to the system on account of power fluctuations or spikes are not covered under
  warranty. Also we shall not be liable for any damage to the equipment resulting from thunder/natural disaster.) [2] Goods once sold cannot be
  returned or exchanged. [3] In case the payment is not made within the agreed terms, 24% P.A. interest component will be charged on the due
  payment. [4] All legal matters will be settled in the Gujarat jurisdiction only.
  Authorized Signature
  2DUPLICATE
  TAX INVOICE
  ANALOG ECLIPSE`

  const prompt=`Extract the Details from this invoice in json format.
  if data is not available in invoice then give me blank please now give me json data.
  
  explanation of each term 
  CardCode :- It means Vendor ID which can always start with "V",
  
  TaxDate :- Tax date on an invoice refers to the date on which a delivery is recorded for VAT purposes1. If an invoice is issued within 14 days of the supply date, the invoice date is used as the tax point for VAT purposes.Format For TaxDate should be same that was written in the input.
  
  DocDate :- It is a date on which the Doc is created.
  
  DocDueDate :- It is a date on which the Invoice should be paid or the doc will expire sometimes it is written in invoice but sometimes it will not written also there can be some text that can hint towards the due date calculation.
  
  Card Name :- It is the name of invoice or company name from which the invoice is generated or it can written as heading as well.
  
  Discount Price :- A trade discount is a percentage or dollar amount taken off of the item price or the invoice total. For example, the standard price of a product is $20, and the discounted price is $15, or a 10% discount is taken off of the invoice total due to a summer sale.
  
  DocumentLines :- It is the items list that are in the invoice and it should be the total number of items that are present in invoice.
  
  Item Code :- An item code is a numeric representation of a product or service provided by a department to a customer. Each product needs to have a unique item code to ensure appropriate classification, and item codes are essential for proper invoicing.
  
  Quantity :- the amount of items that are bought in the invoice each items can have different or same quantity.
  
  Tax code :- Tax codes are sequenced collections of one or more tax components that define the tax rates applied on line items and how to calculate the tax amount. Only one tax code can be applied on a line item.
  Tax codes are used in the enhanced tax engine configuration and also in third-party tax calculation systems. Tax codes in the basic tax configuration simply define the name, description, and the country/region.
  For line items that are exempted from tax, instead of not applying a tax code, apply a tax code that has a tax component with zero tax rate. The description of this tax code should clearly indicate that the item is exempted from tax.
  In India Tax code can include IGST,SGST,CGST with the percentage value.
  
  UnitPrice :- It is the price of the single unit of an item. it is not total amount.

  this are the fields that you need to extract from this invoice text, please provide all the data exactly given in invoice and yes you can calculate some terms but don't cut any data from invoice and reply me with every data.

  I have a sample of json and the explataion of each term
    "CardCode": "",
          "TaxDate": "",
          "DocDate": "",
          "DocDueDate": "",
          "CardName": "",
          "DiscountPercent": "",
          "DocumentLines": [
              {
                  "ItemCode": "",
                  "Quantity": "",
                  "TaxCode": "",
                  "UnitPrice": ""
              }
          ]
  
  
  `

    const together = new Together({
        apiKey: process.env["TOGETHER_API_KEY"],
      });
      
      const response = await together.chat.completions.create({
        messages: [{ role: "user", content:`${text}\n ${prompt}`}],
        // model: "Qwen/Qwen1.5-110B-Chat",
        model: "meta-llama/Llama-3-8b-chat-hf",

      });
      console.log("res",response.choices?.[0]?.message?.content)
      res.send({"resposnse":response.choices?.[0]?.message?.content})
};