'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Warning,
  Info,
  Security,
  Payment,
  Cancel,
  CalendarToday,
  Person,
  Hotel,
  Star,
  SupportAgent,
} from '@mui/icons-material';
import { useState } from 'react';

export default function TermsAndConditions() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Terms & Conditions
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Last updated: December 1, 2024 | Effective immediately
        </Typography>
        <Chip
          label="Please read carefully"
          color="primary"
          variant="outlined"
          sx={{ mt: 2, fontWeight: 'bold' }}
        />
        <Divider sx={{ my: 4 }} />
      </Box>

      {/* Quick Summary Cards */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 6,
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            p: 3,
            flex: 1,
            minWidth: 250,
            maxWidth: 300,
            textAlign: 'center',
          }}
          elevation={3}
        >
          <Security color="primary" sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Secure Booking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bank-level encryption for all your personal and payment information
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            flex: 1,
            minWidth: 250,
            maxWidth: 300,
            textAlign: 'center',
          }}
          elevation={3}
        >
          <Payment color="primary" sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Best Price Guarantee
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Found a lower price? We&apos;ll match it and give you 10% additional
            discount
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            flex: 1,
            minWidth: 250,
            maxWidth: 300,
            textAlign: 'center',
          }}
          elevation={3}
        >
          <SupportAgent color="primary" sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            24/7 Support
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Round-the-clock customer service for all your booking needs
          </Typography>
        </Paper>
      </Box>

      {/* Important Notice */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          bgcolor: 'warning.light',
          border: '2px solid',
          borderColor: 'warning.main',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Warning sx={{ mr: 1, color: 'warning.dark' }} />
          <Typography variant="h6" fontWeight="bold">
            Important Notice
          </Typography>
        </Box>
        <Typography variant="body2">
          By using Bookmipg Hotel services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and Conditions. These
          terms affect your legal rights and obligations.
        </Typography>
      </Paper>

      {/* Main Content */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Introduction */}
        <Box mb={4}>
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >
            Welcome to Bookmipg Hotel
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms and Conditions (Terms) govern your use of the Bookmipg
            Hotel platform, including our website, mobile application, and
            related services (collectively, the Platform). By accessing or using
            our Platform, you agree to be bound by these Terms and our Privacy
            Policy.
          </Typography>
        </Box>

        {/* Accordion Sections */}
        <Box>
          {/* 1. Definitions */}
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                1. Definitions & Interpretation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                In these Terms, unless the context otherwise requires:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Hotel color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Platform"
                    secondary="Refers to Bookmipg Hotel website, mobile application, and all related services"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Guest/User"
                    secondary="Any individual or entity accessing or using the Platform to search or book accommodations"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Star color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Service Provider"
                    secondary="Hotels, resorts, property owners, or accommodation providers listed on our platform"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Payment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Booking"
                    secondary="A reservation made through our Platform for accommodation services"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 2. Account Registration */}
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                2. Account Registration & Security
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                To access certain features and make bookings, you must create an
                account with accurate and complete information.
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Accurate Information"
                    secondary="You must provide true, accurate, current, and complete registration information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Password Security"
                    secondary="Maintain confidentiality of your password and account details. Notify us immediately of any unauthorized use"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Account Responsibility"
                    secondary="You are responsible for all activities under your account. Bookmipg Hotel is not liable for any losses from unauthorized access"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 3. Booking Process */}
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                3. Booking Process & Confirmation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                When you make a booking through Bookmipg Hotel, you enter into a
                direct contractual relationship with the Service Provider.
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, color: 'primary.main' }}
              >
                Booking Stages:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Search & Selection"
                    secondary="Browse available properties, compare prices, and select your preferred accommodation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Reservation Request"
                    secondary="Submit booking request with required details and payment information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Confirmation"
                    secondary="Most bookings receive instant confirmation. Some may require provider approval within 2-4 hours"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Voucher & Details"
                    secondary="Receive booking confirmation with all details and check-in instructions"
                  />
                </ListItem>
              </List>

              <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  💡 Important: Always review booking details carefully before
                  confirmation. Double-check dates, room type, guest names, and
                  special requests.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 4. Payment Terms */}
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                4. Payment & Pricing Terms
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Bookmipg Hotel offers secure payment processing with multiple
                payment options.
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Payment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment Methods"
                    secondary="We accept credit/debit cards (Visa, MasterCard, American Express), digital wallets, and bank transfers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Secure Transactions"
                    secondary="All payments are processed through PCI-DSS compliant payment gateways with SSL encryption"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Price Display"
                    secondary="All prices are displayed in local currency but may be charged in your card's currency with conversion fees"
                  />
                </ListItem>
              </List>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, color: 'primary.main' }}
              >
                Payment Structure:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" paragraph>
                  • <strong>Pay at Property:</strong> Some bookings allow
                  payment upon arrival
                  <br />• <strong>Prepayment:</strong> Many deals require full
                  or partial prepayment
                  <br />• <strong>Security Deposit:</strong> Some properties may
                  require a refundable security deposit
                  <br />• <strong>Taxes & Fees:</strong> All applicable taxes
                  and service fees are included in the final price
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 5. Cancellation Policy */}
          <Accordion
            expanded={expanded === 'panel5'}
            onChange={handleChange('panel5')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                5. Cancellation & Modification Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Cancellation policies vary by property and rate type. Always
                check the specific cancellation policy before booking.
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Cancel color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Standard Cancellation"
                    secondary="Free cancellation up to 24-48 hours before check-in for most properties"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Non-refundable Rates"
                    secondary="Special deals may be non-refundable. Clearly marked during booking process"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Modification Policy"
                    secondary="Date changes subject to availability and rate differences. Modification fees may apply"
                  />
                </ListItem>
              </List>

              <Box
                sx={{ p: 2, bgcolor: 'error.light', borderRadius: 1, mt: 2 }}
              >
                <Typography variant="body2" fontWeight="bold">
                  ⚠️ No-show Policy: Failure to check-in without prior
                  cancellation will result in full charges as per the
                  property&apos;s policy.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 6. Guest Responsibilities */}
          <Accordion
            expanded={expanded === 'panel6'}
            onChange={handleChange('panel6')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                6. Guest Responsibilities & Conduct
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                As a guest, you agree to adhere to the following
                responsibilities:
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Valid Identification"
                    secondary="Present valid government-issued ID at check-in. Minimum age requirement: 18 years"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Property Rules"
                    secondary="Comply with all property rules, including noise policies, smoking restrictions, and visitor policies"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Damage Liability"
                    secondary="You are responsible for any damage caused to the property during your stay"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Check-in/Check-out"
                    secondary="Adhere to specified check-in and check-out times. Late check-out subject to additional charges"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 7. Limitation of Liability */}
          <Accordion
            expanded={expanded === 'panel7'}
            onChange={handleChange('panel7')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                7. Limitation of Liability
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Bookmipg Hotel acts as an intermediary between guests and
                service providers. Our liability is limited as follows:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Service Intermediary"
                    secondary="We are not liable for services provided by third-party accommodation providers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Property Disputes"
                    secondary="Direct all service-related issues to the property management. We assist in resolution"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Maximum Liability"
                    secondary="Our maximum liability shall not exceed the total booking value or $500, whichever is lower"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Contact Information */}
        <Box
          sx={{
            p: 3,
            bgcolor: 'primary.light',
            borderRadius: 2,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Need Help with These Terms?
          </Typography>
          <Typography variant="body1" paragraph>
            Our customer service team is available 24/7 to assist you with any
            questions regarding these Terms and Conditions.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<SupportAgent />}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Contact Support
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Email: legal@bookmipghotel.com | Phone: +1-800-BOOKMIPG
          </Typography>
        </Box>

        {/* Footer Note */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            By using Bookmipg Hotel services, you acknowledge that you have
            read, understood, and agree to be bound by these Terms and
            Conditions.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
