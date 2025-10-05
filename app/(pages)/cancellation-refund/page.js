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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  ExpandMore,
  Cancel,
  Autorenew,
  Payment,
  Schedule,
  Warning,
  CheckCircle,
  Info,
  SupportAgent,
  Email,
  Phone,
  Hotel,
  AccessTime,
  MoneyOff,
  LocalAtm,
} from '@mui/icons-material';
import { useState } from 'react';

export default function CancellationRefundPolicy() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Cancellation & Refund Policy
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Last updated: December 1, 2024 | Flexible options for your peace of
          mind
        </Typography>
        <Chip
          label="Transparent and Fair Policies"
          color="primary"
          variant="outlined"
          sx={{ mt: 2, fontWeight: 'bold' }}
        />
        <Divider sx={{ my: 4 }} />
      </Box>

      {/* Quick Policy Overview */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{ p: 3, height: '100%', textAlign: 'center' }}
            elevation={3}
          >
            <Schedule color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              24-Hour Free Cancellation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Most bookings can be cancelled free of charge up to 24 hours
              before check-in
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{ p: 3, height: '100%', textAlign: 'center' }}
            elevation={3}
          >
            <Autorenew color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Instant Refunds
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Eligible refunds processed within 5-7 business days to your
              original payment method
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{ p: 3, height: '100%', textAlign: 'center' }}
            elevation={3}
          >
            <SupportAgent color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Dedicated Support
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our team is available 24/7 to assist with cancellations and
              modifications
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Important Alert */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography gutterBottom>
          🔍 Always Check Individual Property Policies
        </Typography>
        <Typography variant="body2">
          While we offer standard cancellation policies, some properties may
          have specific rules. Always review the cancellation policy displayed
          during booking for your specific reservation.
        </Typography>
      </Alert>

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
            Understanding Your Booking Flexibility
          </Typography>
          <Typography variant="body1" paragraph>
            At Bookmipg Hotel, we understand that travel plans can change. Our
            cancellation and refund policies are designed to provide flexibility
            while ensuring fair treatment for both our guests and property
            partners.
          </Typography>
        </Box>

        {/* Cancellation Policy Types */}
        <Box mb={4}>
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >
            Types of Cancellation Policies
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  border: '2px solid',
                  borderColor: 'success.main',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Free Cancellation
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Cancel for free up to 24-48 hours before check-in. Full
                    refund provided.
                  </Typography>
                  <Chip label="Most Popular" color="success" size="small" />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  border: '2px solid',
                  borderColor: 'warning.main',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTime color="warning" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Partial Refund
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Cancel within specified period for partial refund. Varies by
                    property.
                  </Typography>
                  <Chip
                    label="Moderate Flexibility"
                    color="warning"
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  border: '2px solid',
                  borderColor: 'error.main',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MoneyOff color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Non-Refundable
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Special discounted rates that cannot be cancelled or
                    modified.
                  </Typography>
                  <Chip label="Save up to 25%" color="error" size="small" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Accordion Sections */}
        <Box>
          {/* 1. Standard Cancellation Policy */}
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                1. Standard Cancellation Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Our standard policy applies to most bookings and offers maximum
                flexibility:
              </Typography>

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mb: 3 }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.light' }}>
                      <TableCell>
                        <strong>Cancellation Time</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Refund Amount</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Conditions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>More than 48 hours before check-in</TableCell>
                      <TableCell>100% refund</TableCell>
                      <TableCell>No cancellation fees</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>24-48 hours before check-in</TableCell>
                      <TableCell>90% refund</TableCell>
                      <TableCell>10% processing fee applies</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Less than 24 hours before check-in</TableCell>
                      <TableCell>50% refund</TableCell>
                      <TableCell>Late cancellation fee</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: 'error.light' }}>
                      <TableCell>After check-in time or no-show</TableCell>
                      <TableCell>No refund</TableCell>
                      <TableCell>Full amount charged</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> Check-in time is typically 2:00 PM or
                  3:00 PM local time. Always verify the specific check-in time
                  for your property.
                </Typography>
              </Alert>
            </AccordionDetails>
          </Accordion>

          {/* 2. Non-Refundable Bookings */}
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                2. Non-Refundable Bookings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Non-refundable rates offer significant discounts but come with
                strict cancellation terms:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="No Cancellations"
                    secondary="Booking cannot be cancelled once confirmed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="No Modifications"
                    secondary="Dates, room type, or guest details cannot be changed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="No Refunds"
                    secondary="Full amount is charged immediately and is non-refundable"
                  />
                </ListItem>
              </List>

              <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2">
                  <strong>💡 Tip:</strong> Non-refundable rates are clearly
                  marked during booking with a warning message. Only choose this
                  option if you&apos;re certain about your travel plans.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 3. Refund Processing */}
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                3. Refund Processing & Timelines
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We process refunds as quickly as possible. Here&apos;s what to
                expect:
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Refund Timeline
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Processing Time"
                        secondary="1-3 business days to approve refund"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Payment color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Bank Processing"
                        secondary="3-10 business days to appear in your account"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocalAtm color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Payment Method"
                        secondary="Refunded to original payment method used for booking"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Factors Affecting Timeline
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Bank Policies"
                        secondary="Your bank's processing times may vary"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Weekends/Holidays"
                        secondary="Processing may take longer during non-business days"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Payment Method"
                        secondary="Credit cards typically faster than debit cards or bank transfers"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* 4. Modification Policy */}
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                4. Booking Modifications
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Need to change your booking? Here&apos;s our modification
                policy:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date Changes"
                    secondary="Subject to availability and rate differences. No fee if changed 48+ hours before check-in"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Room Type Changes"
                    secondary="Allowed based on availability. Price difference applies"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Guest Name Changes"
                    secondary="Permitted up to 24 hours before check-in. ID verification required"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Shortening Stay"
                    secondary="Treated as partial cancellation. Standard cancellation fees apply to unused nights"
                  />
                </ListItem>
              </List>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>How to Modify:</strong> Visit My Bookings in your
                  account or contact our customer service team. Modifications
                  are subject to the property&apos;s approval.
                </Typography>
              </Alert>
            </AccordionDetails>
          </Accordion>

          {/* 5. Special Circumstances */}
          <Accordion
            expanded={expanded === 'panel5'}
            onChange={handleChange('panel5')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                5. Special Circumstances
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                We understand that exceptional situations may arise. Here&apos;s
                how we handle them:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Medical Emergencies"
                    secondary="Full refund with valid medical certificate submitted within 7 days"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Flight Cancellations"
                    secondary="Full refund with official airline documentation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Natural Disasters"
                    secondary="Case-by-case evaluation. Travel insurance recommended"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Government Travel Restrictions"
                    secondary="Full refund or credit voucher for future stay"
                  />
                </ListItem>
              </List>

              <Box
                sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1, mt: 2 }}
              >
                <Typography variant="body2" fontWeight="bold">
                  ⚠️ Documentation Required: All special circumstance claims
                  require official documentation and are subject to verification
                  and approval.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* 6. Property-Specific Policies */}
          <Accordion
            expanded={expanded === 'panel6'}
            onChange={handleChange('panel6')}
            elevation={2}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" sx={{ width: '100%' }}>
                6. Property-Specific Policies
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Some properties may have unique cancellation policies:
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Luxury Resorts & Hotels
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Longer Cancellation Period"
                        secondary="May require 7-14 days notice for full refund"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Deposit Requirements"
                        secondary="Non-refundable deposits common for peak season"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Vacation Rentals
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Stricter Policies"
                        secondary="Often 30-day cancellation notice for full refund"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Cleaning Fees"
                        secondary="May be non-refundable after booking"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Always Verify:</strong> The specific cancellation
                  policy for your booking is clearly displayed during the
                  reservation process and in your confirmation email.
                </Typography>
              </Alert>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* How to Cancel Section */}
        <Box sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 2, mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
          >
            How to Cancel Your Booking
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Typography variant="h3" color={'#fff'}>
                  1
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Online
                </Typography>
                <Typography variant="body2">
                  Log in to your account, go to My Bookings and select Cancel
                  Reservation
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Typography variant="h3" color={'#fff'}>
                  2
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Mobile App
                </Typography>
                <Typography variant="body2">
                  Use our mobile app to cancel bookings instantly from anywhere
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Typography variant="h3" color={'#fff'}>
                  3
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Customer Service
                </Typography>
                <Typography variant="body2">
                  Call our 24/7 support team for assistance with cancellations
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Contact & Support Section */}
        <Box
          sx={{
            p: 3,
            bgcolor: 'grey.100',
            borderRadius: 2,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Need Help with Cancellation?
          </Typography>
          <Typography variant="body1" paragraph>
            Our customer service team is available 24/7 to assist with
            cancellations, modifications, and refund inquiries.
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
              support@bookmipghotel.com
            </Button>
            <Button
              variant="outlined"
              startIcon={<Phone />}
              sx={{ borderRadius: 2 }}
            >
              +1-800-CANCEL
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Average Response Time: Under 2 hours | Refund Inquiries: 24-48 hours
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
            This Cancellation & Refund Policy may be updated periodically. The
            policy applicable to your booking is the one in effect at the time
            of your reservation. Significant changes will be communicated to
            affected users.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
