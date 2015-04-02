
CREATE TABLE IF NOT EXISTS `distances_villes_france` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cp1` varchar(10) DEFAULT NULL,
  `cp2` varchar(10) DEFAULT NULL,
  `distance` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=211 ;