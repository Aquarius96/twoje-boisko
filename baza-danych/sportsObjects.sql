
CREATE TABLE `zeto`.`sportsObjects` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `type` varchar(30) COLLATE utf8_bin NOT NULL,
  `openDays` varchar(30) COLLATE utf8_bin NOT NULL,
  `openHours` varchar(30) COLLATE utf8_bin NOT NULL,
  `city` varchar(30) COLLATE utf8_bin NOT NULL,
  `street` varchar(30) COLLATE utf8_bin NOT NULL,
  `streetNumber` varchar(30) COLLATE utf8_bin NOT NULL,
  `priceList` varchar(30) COLLATE utf8_bin NOT NULL,
  `contact` varchar(30) COLLATE utf8_bin NOT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `zeto`.`sportsObjects` (`id`, `name`, `type`, `openDays`, `openHours`, `city`, `street`, `streetNumber`, `priceList`, `contact`) VALUES
(1, 'Orlik SW Antoniego', 'orlik', 'PN-PT', '10:00-22:00', 'Olsztyn', 'Rakowa', '29b', '25zl/h', '518799424'),
(2, 'Stadion Stomil', 'stadion', 'SB-SR', '6:00-20:00', 'Olsztyn', 'Czeslawa Oczapowskiego', '1', '18zl/h', '666024321');


select * from zeto.sportsObjects