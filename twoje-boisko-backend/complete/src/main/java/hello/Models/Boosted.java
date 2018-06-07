package hello.Models;

public class Boosted<T,E>{
    /*
    public Reservation ob1;
    public SportObject ob2;

    public BoostedRes(Reservation ob1_, SportObject ob2_){
        this.ob1 = ob1_;
        this.ob2 = ob2_;
    }
    */

    public T e1;
    public E e2;

    public Boosted(T e1_, E e2_){
        this.e1 = e1_;
        this.e2 = e2_;
    }
}