import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  IconButton,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import CountryFlag from "react-native-country-flag"; // Flag component
import logo from "../Image/Q-Gate-Logo.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
const Header = () => {
  const { t, i18n } = useTranslation(); // Hook for translation
  const [language, setLanguage] = useState(i18n.language || "EN");
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer state for mobile menu

  const changeLanguage = (lang) => {
    setLanguage(lang); // Update local language state
    i18n.changeLanguage(lang); // Change language using i18n
    setIsLanguageOpen(false); // Close the language dropdown after selection
  };

  const flag =
    language === "GE" ? (
      <CountryFlag isoCode="DE" size={20} />
    ) : (
      <CountryFlag isoCode="IN" size={20} />
    );

  const menuItems = {
    industries: [
      { label: t("Agriculture"), to: "/agriculture" },

      { label: t("Energy & Utilities"), to: "/energy-utilities" },
      { label: t("Education"), to: "/education" },
      {
        label: t("Smart Transportation & Logistics"),
        to: "/transportation-logistics",
      },
      {
        label: t("Infrastructure Development"),
        to: "/infrastructure-development",
      },
      { label: t("Mining & Mineral Exploration"), to: "/mining-exploration" },
      { label: t("Oil & Gas Industry"), to: "/oil-gas-industry" },
      {
        label: t("Marine & Water Resource Management"),
        to: "/marine-water-resources",
      },
    ],
    services: [
      { label: t("Geospatial Services"), to: "/geospatial-services" },
      { label: t("Software Development"), to: "/software-development" },
      { label: t("Data Analytics"), to: "/data-analytics" },
      { label: t("Content Annotation"), to: "/content-annotation" },
      { label: t("Engineering Solutions"), to: "/engineering-solutions" },
      { label: t("Cloud-Based AI/ML Solutions"), to: "/cloud-ai-ml" },
      { label: t("Professional Training"), to: "/professional-training" },
      { label: t("Talent Solutions"), to: "/talent-solutions" },
    ],
  };

  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="100"
      px={6}
      py={4}
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Logo */}
        <Box>
          <Link to="/" isExternal>
            <Image src={logo} alt="Q-Gate Logo" height="40px" />
          </Link>
        </Box>

        {/* Menu for larger screens */}
        <HStack
          spacing={{ base: 4, md: 8 }}
          display={{ base: "none", md: "flex" }}
          align="center"
        >
          <Link
            to="/"
            fontWeight="600"
            fontSize="md"
            // _hover={{ color: "blue.500" }}
          >
            {t("Home")}
          </Link>
          <Link
            to="/about"
            fontWeight="600"
            fontSize="md"
            _hover={{ color: "blue.500" }}
          >
            {t("About")}
          </Link>
          <Link
            to="/product"
            fontWeight="600"
            fontSize="md"
            _hover={{ color: "blue.500" }}
          >
            {t("Product")}
          </Link>

          <Box
            onMouseEnter={() => setIsIndustriesOpen(true)}
            onMouseLeave={() => setIsIndustriesOpen(false)}
          >
            <Menu isOpen={isIndustriesOpen}>
              <MenuButton as={Link} to="/industries" fontWeight="600">
                {t("Industries")}
              </MenuButton>
              <MenuList>
                <HStack align="start" px={4} py={2}>
                  <VStack align="start" spacing={2}>
                    {menuItems.industries.slice(0, 4).map((item, index) => (
                      <MenuItem key={index}>
                        <Link
                          to={item.to}
                          // _hover={{ textDecoration: "none", color: "blue.500" }}
                        >
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </VStack>
                  <VStack align="start" spacing={2}>
                    {menuItems.industries.slice(4).map((item, index) => (
                      <MenuItem key={index}>
                        <Link
                          to={item.to}
                          // _hover={{ textDecoration: "none", color: "blue.500" }}
                        >
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </VStack>
                </HStack>
              </MenuList>
            </Menu>
          </Box>

          {/* Services Dropdown */}
          <Box
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Menu isOpen={isServicesOpen}>
              <MenuButton as={Link} to="/services" fontWeight="600">
                {t("Services")}
              </MenuButton>
              <MenuList>
                <HStack align="start" px={4} py={2}>
                  <VStack align="start" spacing={2}>
                    {menuItems.services.slice(0, 4).map((item, index) => (
                      <MenuItem key={index}>
                        <Link
                          to={item.to}
                          // _hover={{ textDecoration: "none", color: "blue.500" }}
                        >
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </VStack>
                  <VStack align="start" spacing={2}>
                    {menuItems.services.slice(4).map((item, index) => (
                      <MenuItem key={index}>
                        <Link
                          to={item.to}
                          // _hover={{ textDecoration: "none", color: "blue.500" }}
                        >
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </VStack>
                </HStack>
              </MenuList>
            </Menu>
          </Box>

          <Link
            to="/careers"
            fontWeight="600"
            fontSize="md"
            _hover={{ color: "blue.500" }}
          >
            {t("Careers")}
          </Link>
          <Link
            to="/contact"
            fontWeight="600"
            fontSize="md"
            _hover={{ color: "blue.500" }}
          >
            {t("Contact")}
          </Link>
          <Link
            to="/blogs"
            fontWeight="600"
            fontSize="md"
            _hover={{ color: "blue.500" }}
          >
            {t("Blogs")}
          </Link>
        </HStack>

        {/* Language Selector */}
        <Flex align="center" gap={4}>
          <Box position="relative">
            <Button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              variant="ghost"
              fontWeight="600"
            >
              {flag} {language.toUpperCase()}
            </Button>
            {isLanguageOpen && (
              <Box
                position="absolute"
                right="0"
                top="100%"
                bg="white"
                boxShadow="md"
                borderRadius="md"
                mt={2}
                zIndex="popover"
              >
                <Button
                  variant="ghost"
                  onClick={() => changeLanguage("EN")}
                  width="100%"
                >
                  EN
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => changeLanguage("GE")}
                  width="100%"
                >
                  GE
                </Button>
              </Box>
            )}
          </Box>

          {/* Hamburger Icon for mobile */}

          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ base: "block", md: "none" }}
            onClick={onOpen}
          />
        </Flex>
      </Flex>

      {/* Drawer for Mobile Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link to="/">{t("Home")}</Link>
              <Link to="/about">{t("About")}</Link>
              <Link to="/product">{t("Product")}</Link>

              {/* Industries Dropdown */}
              <Box>
                <Button
                  variant="ghost"
                  onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                  width="100%"
                  textAlign="left"
                >
                  {t("Industries")}
                </Button>
                {isIndustriesOpen && (
                  <VStack align="start" pl={4} spacing={2}>
                    <Link to="/agriculture">{t("Agriculture")}</Link>
                    <Link to="/energy-utilities">
                      {t("Energy & Utilities")}
                    </Link>
                    <Link to="/education">{t("Education")}</Link>
                    <Link to="/transportation-logistics">
                      {t("Smart Transportation & Logistics")}
                    </Link>
                    <Link to="/infrastructure-development">
                      {t("Infrastructure Development")}
                    </Link>
                    <Link to="/mining-exploration">
                      {t("Mining & Mineral Exploration")}
                    </Link>
                    <Link to="/oil-gas-industry">
                      {t("Oil & Gas Industry")}
                    </Link>
                    <Link to="/marine-water-resources">
                      {t("Marine & Water Resource Management")}
                    </Link>
                  </VStack>
                )}
              </Box>

              {/* Services Dropdown */}
              <Box>
                <Button
                  variant="ghost"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  width="100%"
                  textAlign="left"
                >
                  {t("Services")}
                </Button>
                {isServicesOpen && (
                  <VStack align="start" pl={4} spacing={2}>
                    <Link to="/geospatial-services">
                      {t("Geospatial Services")}
                    </Link>
                    <Link to="/software-development">
                      {t("Software Development")}
                    </Link>
                    <Link to="/data-analytics">{t("Data Analytics")}</Link>
                    <Link to="/content-annotation">
                      {t("Content Annotation")}
                    </Link>
                    <Link to="/engineering-solutions">
                      {t("Engineering Solutions")}
                    </Link>
                    <Link to="/cloud-ai-ml">
                      {t("Cloud-Based AI/ML Solutions")}
                    </Link>

                    <Link to="/professional-training">
                      {t("Professional Training")}
                    </Link>
                    <Link to="/talent-solutions">{t("Talent Solutions")}</Link>
                  </VStack>
                )}
              </Box>

              <Link to="/careers">{t("Careers")}</Link>
              <Link to="/contact">{t("Contact")}</Link>
              <Link to="/blogs">{t("Blogs")}</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
