
CREATE TABLE `zeto`.`reservations` (
  `id` int(11) NOT NULL,
  `dateDay` varchar(30) COLLATE utf8_bin NOT NULL,
  `hourStart` varchar(30) COLLATE utf8_bin NOT NULL,
  `hourEnd` varchar(30) COLLATE utf8_bin NOT NULL,
  `idObject` int(11) COLLATE utf8_bin NOT NULL,
  `idUser` int(11) COLLATE utf8_bin NOT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `users`
--



select * from zeto.reservations