package hello.Helpers;
import java.text.DateFormat;
import java.text.ParseException;
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

    public void setacceptedHours(Integer h){
        acceptedHours = h;
    }
    public String checkHash(String value, String fromDB) throws ParseException{
        Date now = new Date();
        String sub = value.substring(0,16);
        Date fromValue = dateFormat.parse(sub);

        long diffInMillies = fromValue.getTime() - now.getTime();

        if (acceptedHours > TimeUnit.HOURS.convert(diffInMillies,TimeUnit.MILLISECONDS)){
            if (value.substring(19).equals(fromDB)) return "OK";
            else return "BAD";
        } 

        return "TIMEOUT";

    }

    public String deHash(String value){
        return new String(Base64.getDecoder().decode(toByteArray(value)));
        }

    private byte[] toByteArray(String s) {
        return DatatypeConverter.parseHexBinary(s);
    }

    public String getHash(String value){
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