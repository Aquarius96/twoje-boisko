zainstaluj XAMPP a w nim uruchom APACHE i MYSQL
zainstaluj dodatek MYSQL 0.3.0 taka niebieska ikonka kilku dyskow na sobie
w exploratorze plikow vs code na samym dole zakladka mysql na niej po prawej plusik nacisnac:
    127.0.0.1
    root
    enter
    3306 -> jest domyslne
    enter
i juz :D


dla pewnosci w twoje-boisko-backend w .classpath dodac:

	<classpathentry kind="lib" path="src/lib/mysql-connector-java-5.1.46.jar"/>


jesli nie masz jeszcze bazy danych zeto to: do pliku zetosql nad create table dopisz 
CREATE DATABASE zeto

nastepnie ppm run... cos tam i powinno dzialac
dowch userow marcin zapadka i admin

w razie problemow pisac do marcina ;*

DONE :D