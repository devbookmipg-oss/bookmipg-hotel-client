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
  Grid,
} from '@mui/material';
import {
  ExpandMore,
  Security,
  PrivacyTip,
  Cookie,
  DataUsage,
  Share,
  Delete,
  Edit,
  Visibility,
  VisibilityOff,
  Lock,
  Policy,
  SupportAgent,
  Email,
  Phone,
  CheckCircle,
} from '@mui/icons-material';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Privacy Policy
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Last updated: December 1, 2024 | Your privacy is our priority
        </Typography>
        <Chip
          label="We protect your data like our own"
          color="primary"
          variant="outlined"
          sx={{ mt: 2, fontWeight: 'bold' }}
        />
        <Divider sx={{ my: 4 }} />
      </Box>

      {/* Quick Privacy Overview */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{ p: 3, height: '100%', textAlign: 'center' }}
            elevation={3}
          >
            <Security color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Data Protection
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enterprise-grade encryption and security measures to protect your
              personal information
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{ p: 3, height: '100%', textAlign: 'center' }}
            elevation={3}
          >
            <PrivacyTip color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Your Control
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Full control over your data. Access, modify, or delete your
              information anytime
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{ p: 3, height: '100%', textAlign: 'center' }}
            elevation={3}
          >
            <Cookie color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Transparent Practices
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clear information about how we use cookies and track site usage
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Important Notice */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          bgcolor: 'info.light',
          border: '2px solid',
          borderColor: 'info.main',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PrivacyTip sx={{ mr: 1, color: 'info.dark' }} />
          <Typography variant="h6" fontWeight="bold">
            Our Commitment to You
          </Typography>
        </Box>
        <Typography variant="body2">
          At Bookmipg Hotel, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your data
          when you use our services.
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
            Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Bookmipg Hotel. This Privacy Policy describes how we
            collect, use, process, and disclose your information, including
            personal information, when you use our platform, services, and
            applications.
          </Typography>
          <Typography variant="body1">
            By using Bookmipg Hotel services, you consent to the practices
            described in this Privacy Policy.
          </Typography>
        </Box>

        {/* Accordion Sections */}
        <Box>
          {/* 1. Information We Collect */}
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                1. Information We Collect
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We collect several types of information to provide and improve
                our services:
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, color: 'primary.main' }}
              >
                Personal Information:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Edit color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Contact Details"
                    secondary="Full name, email address, phone number, home address"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Policy color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Identification"
                    secondary="Government-issued ID details for verification (when required)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DataUsage color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment Information"
                    secondary="Credit card details, billing address (securely processed by PCI-compliant providers)"
                  />
                </ListItem>
              </List>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, color: 'primary.main' }}
              >
                Booking Information:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Travel Details"
                    secondary="Destination, travel dates, number of guests, special requirements"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Preferences"
                    secondary="Room preferences, loyalty program information, special requests"
                  />
                </ListItem>
              </List>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, color: 'primary.main' }}
              >
                Technical Information:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Device & Browser"
                    secondary="IP address, browser type, device information, operating system"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Usage Data"
                    secondary="Pages visited, search queries, booking history, click patterns"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 2. How We Use Your Information */}
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                2. How We Use Your Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We use the information we collect for various business purposes:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Service Delivery"
                    secondary="Process bookings, send confirmations, manage your account, provide customer support"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Communication"
                    secondary="Send booking updates, promotional offers (with consent), important service announcements"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Personalization"
                    secondary="Tailor search results, show relevant offers, remember your preferences"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security & Fraud Prevention"
                    secondary="Verify identities, prevent fraudulent activities, protect our platform"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Improvement & Analytics"
                    secondary="Analyze usage patterns, improve our services, develop new features"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 3. Information Sharing */}
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                3. Information Sharing & Disclosure
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We may share your information in the following circumstances:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Share color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="With Accommodation Providers"
                    secondary="Share necessary booking details with hotels for reservation processing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Share color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Service Providers"
                    secondary="Trusted partners who help us operate our platform (payment processors, analytics)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Policy color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Legal Requirements"
                    secondary="When required by law, court order, or governmental regulations"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Business Transfers"
                    secondary="In connection with mergers, acquisitions, or sale of company assets"
                  />
                </ListItem>
              </List>

              <Box
                sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1, mt: 2 }}
              >
                <Typography variant="body2" fontWeight="bold">
                  🔒 We never sell your personal information to third parties
                  for marketing purposes.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 4. Data Security */}
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                4. Data Security Measures
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We implement robust security measures to protect your
                information:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Lock color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Encryption"
                    secondary="SSL/TLS encryption for all data transmissions, AES-256 encryption for stored data"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Access Controls"
                    secondary="Strict access controls, multi-factor authentication for staff, regular security audits"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VisibilityOff color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment Security"
                    secondary="PCI-DSS compliant payment processing, tokenization for card details"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PrivacyTip color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Regular Monitoring"
                    secondary="24/7 security monitoring, intrusion detection systems, vulnerability assessments"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 5. Cookies & Tracking */}
          <Accordion
            expanded={expanded === 'panel5'}
            onChange={handleChange('panel5')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                5. Cookies & Tracking Technologies
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We use cookies and similar technologies to enhance your
                experience:
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, color: 'primary.main' }}
              >
                Types of Cookies We Use:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Essential Cookies"
                    secondary="Required for basic site functionality and security"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Performance Cookies"
                    secondary="Help us understand how visitors interact with our website"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Functional Cookies"
                    secondary="Remember your preferences and settings"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Marketing Cookies"
                    secondary="Used to deliver relevant advertisements (with your consent)"
                  />
                </ListItem>
              </List>

              <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, mt: 2 }}>
                <Typography variant="body2">
                  <strong>Cookie Control:</strong> You can manage your cookie
                  preferences through your browser settings. However, disabling
                  essential cookies may affect website functionality.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 6. Your Rights */}
          <Accordion
            expanded={expanded === 'panel6'}
            onChange={handleChange('panel6')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                6. Your Privacy Rights
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                You have the following rights regarding your personal
                information:
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Visibility color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Right to Access"
                        secondary="Request a copy of your personal data we hold"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Edit color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Right to Rectification"
                        secondary="Correct inaccurate or incomplete information"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Delete color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Right to Erasure"
                        secondary="Request deletion of your personal data"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <DataUsage color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Right to Restrict Processing"
                        secondary="Limit how we use your data"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Share color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Right to Data Portability"
                        secondary="Receive your data in a machine-readable format"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PrivacyTip color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Right to Object"
                        secondary="Object to certain types of processing"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => (window.location.href = '/privacy-request')}
              >
                Submit Privacy Request
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* 7. Data Retention */}
          <Accordion
            expanded={expanded === 'panel7'}
            onChange={handleChange('panel7')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                7. Data Retention Periods
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We retain your personal information only for as long as
                necessary:
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Active Accounts"
                    secondary="While your account is active and for 3 years after last activity"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Booking Records"
                    secondary="7 years for financial and tax compliance purposes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Marketing Data"
                    secondary="Until you unsubscribe or withdraw consent"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Technical Logs"
                    secondary="Up to 2 years for security and analytics purposes"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* 8. International Transfers */}
          <Accordion
            expanded={expanded === 'panel8'}
            onChange={handleChange('panel8')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                8. International Data Transfers
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Your information may be transferred to and processed in
                countries other than your own:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Global Operations"
                    secondary="We operate globally and may process data in various countries"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Policy color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Adequate Protection"
                    secondary="We ensure appropriate safeguards for international data transfers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PrivacyTip color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Legal Compliance"
                    secondary="All transfers comply with applicable data protection laws"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Contact & Support Section */}
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
            Privacy Questions?
          </Typography>
          <Typography variant="body1" paragraph>
            Contact our Data Protection Officer for any privacy-related
            inquiries or to exercise your rights.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Email />}
              sx={{ borderRadius: 2 }}
            >
              privacy@bookmipghotel.com
            </Button>
            <Button
              variant="outlined"
              startIcon={<Phone />}
              sx={{ borderRadius: 2, color: '#fff', border: '1px solid #fff' }}
            >
              +1-800-PRIVACY
            </Button>
          </Box>

          <Typography variant="body2">
            Data Protection Officer: Sarah Johnson | Response Time: Within 48
            hours
          </Typography>
        </Box>

        {/* Policy Updates */}
        <Box
          sx={{
            p: 2,
            mt: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Policy Updates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We may update this Privacy Policy periodically. We will notify you
            of significant changes by posting the new policy on our platform and
            updating the Last updated date. Continued use of our services after
            changes constitutes acceptance of the updated policy.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
