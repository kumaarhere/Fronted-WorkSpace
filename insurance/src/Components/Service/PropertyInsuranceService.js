
import axios from 'axios';
// import Header from '../Header';

class PropertyInsuranceService {

    static createDetails(values) {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/putStructure";
        return axios.post(INSURANCE_API_BASE_URL, values);
    }

     static getAllDetails(){
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getStructure";
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static getStructureDetailsByCustomerId(customerid)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getStructureByCustomerId/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static createCustomer(feilds){
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/putCustomer";
        return axios.post(INSURANCE_API_BASE_URL, feilds);
    }

    static getCustomer(){
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getCustomer";
        return axios.get(INSURANCE_API_BASE_URL);
    }
    static getCustomerIdByMobileNo(mobileno){
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getCustomerByMobileNumber/"+mobileno;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static createfillDetails(data)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/putData";
        return axios.post(INSURANCE_API_BASE_URL, data);
    }

    static getfillDetails()
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getData";
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static getFillDetailsByCustomerId(customerid){
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getfillDetailsByCustomerId/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static createPaymentData(details)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/putPaymentData";
        return axios.post(INSURANCE_API_BASE_URL, details);
    }

    static getPaymentData()
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getPaymentData";
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static getPaymentDetailsByCustomerId(customerid)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/getPaymentDetailsByCustomerId/"+customerid;
        return axios.get(INSURANCE_API_BASE_URL);
    }

    static login(values)
    {
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/login";
        return axios.post(INSURANCE_API_BASE_URL,values);
    }
    static checkMobileNumber(s)
    {
        // const a={s,d}
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/checkMobileNumber/"+s;
        return axios.get(INSURANCE_API_BASE_URL);
                
    }

    static checkEmail(d)
    {
        // const a={s,d}
        const INSURANCE_API_BASE_URL = "http://192.168.1.3:9092/api/v1/checkEmail/"+d;
        return axios.get(INSURANCE_API_BASE_URL);
                
    }




}

export default PropertyInsuranceService;
