
CREATE TABLE `zeto`.`news` (
  `id` int(11) NOT NULL,
  `header` varchar(30) COLLATE utf8_bin NOT NULL,
  `text` varchar(500) COLLATE utf8_bin NOT NULL,
  `date` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `zeto`.`news` (`id`, `header`, `text`, `date`) VALUES
(1, 'Orlik Plonie', 'No splonal i tyle XD', 'wczoraj'),
(2, 'Pedal w druzynie', 'Stomil wzial do druzyny rower z popsutymi pedalami', '21-03-18');


select * from zeto.news