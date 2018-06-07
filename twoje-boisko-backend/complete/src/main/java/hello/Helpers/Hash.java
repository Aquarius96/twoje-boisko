package hello.Helpers;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.xml.bind.DatatypeConverter;



public class Hash{

    private DateFormat dateFormat;

    private Integer acceptedHours;

    public Hash(){
        dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        acceptedHours = 3;
    } 

    public void setAcceptedHours(Integer h){
        acceptedHours = h;
    }
    public String checkHash(String codeFromMail, String codeFromDB){
        Date now = new Date();
        codeFromMail = deHash(codeFromMail);
        codeFromDB = deHash(codeFromDB);
        String subDB = codeFromDB.substring(0,16);
        String subMail = codeFromMail.substring(0,16);

        Date fromDB;
        try{
            dateFormat.parse(subMail);
        }catch(Exception e){
            return "BAD_CODE";
        }

        try{
            fromDB = dateFormat.parse(subDB);
        }catch(Exception e){
            return "ERROR"; //zly code w bazie danych
        }

        long diffInMillies = fromDB.getTime() - now.getTime();

        if (TimeUnit.MILLISECONDS.convert(acceptedHours, TimeUnit.HOURS) > diffInMillies){
            if (codeFromMail.equals(codeFromDB)) return "OK";
            return "BAD_CODE";
        } 

        return "TIMEOUT";

    }
    
    public String checkHash_old(String hashedcode, String codeFromDB){
        Date now = new Date();
        hashedcode = deHash(hashedcode);
        String sub = hashedcode.substring(0,16);
        Date fromHash ;
        try{
            fromHash = dateFormat.parse(sub);
        }catch(Exception e){
            return "BAD_CODE";
        }

        long diffInMillies = fromHash.getTime() - now.getTime();

        if (TimeUnit.MILLISECONDS.convert(acceptedHours, TimeUnit.HOURS) > diffInMillies){
            if (hashedcode.substring(19).equals(codeFromDB)) return "OK";
            return "BAD_CODE";
        } 

        return "TIMEOUT";

    }

    public String refresz(String code){
        code = deHash(code);
        return getFreshHash(code.substring(19));
    }

    public String deHash(String value){
        return new String(Base64.getDecoder().decode(toByteArray(value)));
        }

    private byte[] toByteArray(String s) {
        return DatatypeConverter.parseHexBinary(s);
    }

    public String getFreshHash(String value){
        Date date = new Date();
        String toHash = dateFormat.format(date) + " - " + value;

        byte[] bytes = Base64.getEncoder().encode(toHash.getBytes());

        return  bytesToHex(bytes);


    }

     private static String bytesToHex(byte[] bytes) {
        StringBuffer result = new StringBuffer();
        for (byte b : bytes) result.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
        return result.toString();
     }

}