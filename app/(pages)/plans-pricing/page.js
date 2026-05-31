'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
  alpha,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Hotel,
  Restaurant,
  BusinessCenter,
  WorkspacePremium,
  Diamond,
  Star,
  Speed,
  SupportAgent,
} from '@mui/icons-material';

// All plans unified display
const allPlans = [
  {
    category: 'Hotel Management',
    categoryIcon: <Hotel />,
    plans: [
      {
        name: 'Essential',
        tagline: 'Perfect for small hotels',
        rooms: 'Up to 50 Rooms',
        price: '₹14,999',
        renewal: '₹11,999',
        color: '#3b82f6',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        icon: <Hotel />,
        popular: false,
        features: [
          'Manage Staff Account',
          'Manage Property Details',
          'Manage Room Categories & Rooms',
          'Manage Payment Methods',
          'Booking Overview Dashboard',
          'Handle Reservations',
          'Manage Bookings',
          'Check-In / Check-Out System',
        ],
      },
      {
        name: 'Prestige',
        tagline: 'Most popular choice',
        rooms: '50 - 100 Rooms',
        price: '₹21,999',
        renewal: '₹18,999',
        color: '#dc2626',
        gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        icon: <BusinessCenter />,
        popular: true,
        features: [
          'Manage Staff Account',
          'Manage Property Details',
          'Manage Room Categories & Rooms',
          'Manage Payment Methods',
          'Booking Overview Dashboard',
          'Handle Reservations',
          'Manage Bookings',
          'Check-In / Check-Out System',
          'Manage Room Services',
          'Room Food Transfer',
          'Single Booking Multi-Invoice System',
          'Generate Booking Slip',
          'Room Invoice Reports',
          'Housekeeping System',
        ],
      },
      {
        name: 'Imperial',
        tagline: 'Ultimate enterprise solution',
        rooms: '100+ Rooms',
        price: '₹29,999',
        renewal: '₹24,999',
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        icon: <WorkspacePremium />,
        popular: false,
        features: [
          'Manage Staff Account',
          'Manage Property Details',
          'Manage Room Categories & Rooms',
          'Manage Payment Methods',
          'Booking Overview Dashboard',
          'Handle Reservations',
          'Manage Bookings',
          'Check-In / Check-Out System',
          'Manage Room Services',
          'Room Food Transfer',
          'Single Booking Multi-Invoice System',
          'Generate Booking Slip',
          'Room Invoice Reports',
          'Housekeeping System',
          'Inventory Management',
          'Stock In / Stock Out',
          'Stock Reports',
          'Invoice Reports',
          'Daily Expense Tracking',
          'Income Expense Reports',
        ],
      },
    ],
  },
  {
    category: 'Hotel + Restaurant',
    categoryIcon: <Restaurant />,
    plans: [
      {
        name: 'Essential',
        tagline: 'Integrated dining essentials',
        rooms: 'Up to 50 Rooms',
        price: '₹24,999',
        renewal: '₹21,999',
        color: '#3b82f6',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        icon: <Restaurant />,
        popular: false,
        features: [
          'All Hotel Features',
          'Manage Tables',
          'Manage Table Orders',
          'Manage Invoice',
          'Manage Menu Items',
          'Manage Table Reservations',
          'Thermal Invoice',
        ],
      },
      {
        name: 'Prestige',
        tagline: 'Complete hospitality suite',
        rooms: '50 - 100 Rooms',
        price: '₹31,999',
        renewal: '₹28,999',
        color: '#dc2626',
        gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        icon: <BusinessCenter />,
        popular: true,
        features: [
          'All Hotel Features',
          'Manage Tables',
          'Manage Table Orders',
          'Manage Invoice',
          'Manage Menu Items',
          'Manage Table Reservations',
          'Thermal Invoice',
          'Advanced Analytics',
          'Multi-Branch Support',
          'Supplier Management',
        ],
      },
      {
        name: 'Imperial',
        tagline: 'Full-scale enterprise',
        rooms: '100+ Rooms',
        price: '₹39,999',
        renewal: '₹34,999',
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        icon: <WorkspacePremium />,
        popular: false,
        features: [
          'All Hotel Features',
          'All Restaurant Features',
          'Advanced Analytics',
          'Multi-Branch Support',
          'Supplier Management',
          'Custom Integrations',
          'Dedicated Account Manager',
          'Priority Support',
        ],
      },
    ],
  },
  {
    category: 'Restaurant POS',
    categoryIcon: <Restaurant />,
    plans: [
      {
        name: 'Solo',
        tagline: 'For independent restaurants',
        rooms: 'Single Outlet',
        price: '₹14,999',
        renewal: '₹10,999',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        icon: <Restaurant />,
        popular: false,
        features: [
          'Manage Tables',
          'Manage Table Orders',
          'Manage Invoice',
          'Manage Menu Items',
          'Manage Table Reservations',
          'Thermal Invoice',
          'Order History',
          'Daily Sales Report',
        ],
      },
    ],
  },
];

// Shared enterprise features badge
const enterpriseBadge = {
  Imperial: '🏆 Enterprise',
  Enterprise: '🚀 Ultimate',
  Pro: '🔥 Best Value',
  Prestige: '⭐ Most Popular',
  Essential: '📌 Starter',
  Solo: '🍽️ Starter',
};

export default function PlansPage() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section - Elegant & Modern */}
      <Box
        sx={{
          position: 'relative',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b1b 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg">
          <Chip
            label="BOOKMIPG PRICING"
            sx={{
              bgcolor: 'rgba(255,255,255,0.12)',
              color: '#f1f5f9',
              backdropFilter: 'blur(8px)',
              mb: 4,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: 1,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              fontWeight: 800,
              letterSpacing: '-0.02em',
              mb: 2,
              background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Plans That Scale With You
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#cbd5e1',
              maxWidth: '700px',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Choose the perfect solution for your hospitality business — from
            boutique hotels to restaurant chains. All plans include dedicated
            support and regular updates.
          </Typography>

          {/* Trust badges */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ mt: 5 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed sx={{ fontSize: 20, color: '#ef4444' }} />
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                99.9% Uptime Guarantee
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SupportAgent sx={{ fontSize: 20, color: '#ef4444' }} />
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                24/7 Priority Support
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ fontSize: 20, color: '#10b981' }} />
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                No Hidden Fees
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Plans Display - All at Once, Elegant Cards */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        {allPlans.map((category, idx) => (
          <Box
            key={category.category}
            sx={{ mb: idx !== allPlans.length - 1 ? 10 : 0 }}
          >
            {/* Category Header */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 5, textAlign: 'center', justifyContent: 'center' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '24px',
                  background: `linear-gradient(135deg, ${theme.palette.error.main}20, ${theme.palette.error.main}10)`,
                  color: theme.palette.error.main,
                }}
              >
                {category.categoryIcon}
              </Box>
              <Typography variant="h4" fontWeight={700} letterSpacing="-0.01em">
                {category.category}
              </Typography>
            </Stack>

            {/* Conditional rendering for single plan vs multiple plans */}
            {category.plans.length === 1 ? (
              // Center single plan
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ maxWidth: '500px', width: '100%' }}>
                  {category.plans.map((plan) => (
                    <Card
                      elevation={0}
                      key={plan.name}
                      sx={{
                        height: '100%',
                        borderRadius: '32px',
                        background: '#ffffff',
                        border: plan.popular
                          ? `2px solid ${theme.palette.error.main}`
                          : '1px solid #e9edf2',
                        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                          borderColor: plan.popular
                            ? theme.palette.error.main
                            : '#cbd5e1',
                        },
                      }}
                    >
                      {plan.popular && (
                        <Chip
                          label="MOST POPULAR"
                          icon={<Star sx={{ fontSize: 16 }} />}
                          color="error"
                          sx={{
                            position: 'absolute',
                            top: -14,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontWeight: 700,
                            px: 2,
                            py: 2.5,
                            borderRadius: '40px',
                            fontSize: '0.7rem',
                            letterSpacing: '0.5px',
                            boxShadow: '0 8px 20px rgba(220,38,38,0.3)',
                          }}
                        />
                      )}

                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        {/* Plan icon + name row */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              background: `linear-gradient(135deg, ${plan.color}15, ${plan.color}05)`,
                              borderRadius: '20px',
                              width: 56,
                              height: 56,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: plan.color,
                            }}
                          >
                            {plan.icon}
                          </Box>
                          {enterpriseBadge[plan.name] && (
                            <Chip
                              label={enterpriseBadge[plan.name]}
                              size="small"
                              sx={{
                                bgcolor: alpha(plan.color, 0.12),
                                color: plan.color,
                                fontWeight: 600,
                                fontSize: '0.7rem',
                              }}
                            />
                          )}
                        </Box>

                        <Typography variant="h5" fontWeight={800} mt={1}>
                          {plan.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: '#64748b', mb: 2 }}
                        >
                          {plan.tagline}
                        </Typography>

                        <Chip
                          label={plan.rooms}
                          size="small"
                          sx={{
                            bgcolor: '#f1f5f9',
                            color: '#334155',
                            fontWeight: 500,
                            mb: 3,
                          }}
                        />

                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                              fontSize: { xs: '2.2rem', md: '2.5rem' },
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {plan.price}
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ fontWeight: 400, color: '#64748b' }}
                            >
                              {' '}
                              + GST
                            </Typography>
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            Renewal: {plan.renewal} + 18% GST
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Feature List - clean & minimal */}
                        <Stack
                          spacing={1.5}
                          sx={{
                            mb: 3,
                            maxHeight: 320,
                            overflowY: 'auto',
                            pr: 1,
                          }}
                        >
                          {plan.features.slice(0, 10).map((feature) => (
                            <Box
                              key={feature}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                              }}
                            >
                              <CheckCircle
                                sx={{
                                  fontSize: 16,
                                  color: '#10b981',
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: '#334155', fontWeight: 450 }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                          {plan.features.length > 10 && (
                            <Typography
                              variant="caption"
                              sx={{ color: '#94a3b8', pl: 3.5 }}
                            >
                              +{plan.features.length - 10} more enterprise
                              features
                            </Typography>
                          )}
                        </Stack>

                        <Button
                          fullWidth
                          variant={plan.popular ? 'contained' : 'outlined'}
                          disableElevation
                          sx={{
                            borderRadius: '40px',
                            py: 1.5,
                            mt: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            background: plan.popular
                              ? plan.gradient
                              : 'transparent',
                            borderColor: plan.popular
                              ? 'transparent'
                              : '#cbd5e1',
                            color: plan.popular ? 'white' : plan.color,
                            '&:hover': {
                              background: plan.popular
                                ? plan.gradient
                                : alpha(plan.color, 0.08),
                              borderColor: plan.popular
                                ? 'transparent'
                                : plan.color,
                              transform: 'scale(1.02)',
                            },
                            transition: 'all 0.2s',
                          }}
                        >
                          Start Free Trial →
                        </Button>

                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            textAlign: 'center',
                            mt: 2,
                            color: '#94a3b8',
                          }}
                        >
                          14-day free trial • No credit card required
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            ) : (
              // Grid layout for multiple plans
              <Grid container spacing={4}>
                {category.plans.map((plan) => (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={plan.name}>
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: '32px',
                        background: '#ffffff',
                        border: plan.popular
                          ? `2px solid ${theme.palette.error.main}`
                          : '1px solid #e9edf2',
                        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                          borderColor: plan.popular
                            ? theme.palette.error.main
                            : '#cbd5e1',
                        },
                      }}
                    >
                      {plan.popular && (
                        <Chip
                          label="MOST POPULAR"
                          icon={<Star sx={{ fontSize: 16 }} />}
                          color="error"
                          sx={{
                            position: 'absolute',
                            top: -14,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontWeight: 700,
                            px: 2,
                            py: 2.5,
                            borderRadius: '40px',
                            fontSize: '0.7rem',
                            letterSpacing: '0.5px',
                            boxShadow: '0 8px 20px rgba(220,38,38,0.3)',
                          }}
                        />
                      )}

                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        {/* Plan icon + name row */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              background: `linear-gradient(135deg, ${plan.color}15, ${plan.color}05)`,
                              borderRadius: '20px',
                              width: 56,
                              height: 56,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: plan.color,
                            }}
                          >
                            {plan.icon}
                          </Box>
                          {enterpriseBadge[plan.name] && (
                            <Chip
                              label={enterpriseBadge[plan.name]}
                              size="small"
                              sx={{
                                bgcolor: alpha(plan.color, 0.12),
                                color: plan.color,
                                fontWeight: 600,
                                fontSize: '0.7rem',
                              }}
                            />
                          )}
                        </Box>

                        <Typography variant="h5" fontWeight={800} mt={1}>
                          {plan.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: '#64748b', mb: 2 }}
                        >
                          {plan.tagline}
                        </Typography>

                        <Chip
                          label={plan.rooms}
                          size="small"
                          sx={{
                            bgcolor: '#f1f5f9',
                            color: '#334155',
                            fontWeight: 500,
                            mb: 3,
                          }}
                        />

                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                              fontSize: { xs: '2.2rem', md: '2.5rem' },
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {plan.price}
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ fontWeight: 400, color: '#64748b' }}
                            >
                              {' '}
                              + GST
                            </Typography>
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            Renewal: {plan.renewal} + 18% GST
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Feature List - clean & minimal */}
                        <Stack
                          spacing={1.5}
                          sx={{
                            mb: 3,
                            maxHeight: 320,
                            overflowY: 'auto',
                            pr: 1,
                          }}
                        >
                          {plan.features.slice(0, 10).map((feature) => (
                            <Box
                              key={feature}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                              }}
                            >
                              <CheckCircle
                                sx={{
                                  fontSize: 16,
                                  color: '#10b981',
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: '#334155', fontWeight: 450 }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                          {plan.features.length > 10 && (
                            <Typography
                              variant="caption"
                              sx={{ color: '#94a3b8', pl: 3.5 }}
                            >
                              +{plan.features.length - 10} more enterprise
                              features
                            </Typography>
                          )}
                        </Stack>

                        <Button
                          fullWidth
                          variant={plan.popular ? 'contained' : 'outlined'}
                          disableElevation
                          sx={{
                            borderRadius: '40px',
                            py: 1.5,
                            mt: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            background: plan.popular
                              ? plan.gradient
                              : 'transparent',
                            borderColor: plan.popular
                              ? 'transparent'
                              : '#cbd5e1',
                            color: plan.popular ? 'white' : plan.color,
                            '&:hover': {
                              background: plan.popular
                                ? plan.gradient
                                : alpha(plan.color, 0.08),
                              borderColor: plan.popular
                                ? 'transparent'
                                : plan.color,
                              transform: 'scale(1.02)',
                            },
                            transition: 'all 0.2s',
                          }}
                        >
                          Start Free Trial →
                        </Button>

                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            textAlign: 'center',
                            mt: 2,
                            color: '#94a3b8',
                          }}
                        >
                          14-day free trial • No credit card required
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}
      </Container>

      {/* Comparison Section - Elegant */}
      <Box
        sx={{
          bgcolor: '#ffffff',
          py: 10,
          borderTop: '1px solid #eef2f6',
          borderBottom: '1px solid #eef2f6',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            mb={3}
            letterSpacing="-0.01em"
          >
            Everything You Need to Succeed
          </Typography>
          <Typography
            textAlign="center"
            color="#475569"
            mb={6}
            maxWidth="700px"
            mx="auto"
          >
            Every plan includes core hospitality management features, with
            advanced capabilities as you scale.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <Hotel />,
                title: 'Property Management',
                desc: 'Full room, booking and housekeeping suite',
              },
              {
                icon: <Restaurant />,
                title: 'F&B Integration',
                desc: 'Seamless restaurant & room service sync',
              },
              {
                icon: <BusinessCenter />,
                title: 'Analytics Hub',
                desc: 'Real-time reports and revenue insights',
              },
              {
                icon: <Speed />,
                title: 'Lightning Fast',
                desc: 'Optimized dashboard & instant updates',
              },
            ].map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '28px',
                    bgcolor: '#f8fafc',
                  }}
                >
                  <Box sx={{ color: '#dc2626', mb: 2 }}>{item.icon}</Box>
                  <Typography fontWeight={700} mb={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="#64748b">
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ / CTA Elegant */}
      <Box sx={{ py: 10, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                mb={2}
                letterSpacing="-0.01em"
              >
                Need a Custom Plan?
              </Typography>
              <Typography color="#475569" mb={3}>
                Whether you manage a luxury resort chain or a cloud kitchen
                network, we can tailor a solution for your unique needs.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '40px',
                  px: 4,
                  py: 1.2,
                  borderColor: '#dc2626',
                  color: '#dc2626',
                  fontWeight: 600,
                  '&:hover': { borderColor: '#b91c1c', bgcolor: '#fee2e2' },
                }}
                startIcon={<SupportAgent />}
              >
                Contact Sales Team
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <CheckCircle sx={{ color: '#10b981' }} />
                  <Box>
                    <Typography fontWeight={600}>
                      Flexible Billing Cycles
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Monthly or annual plans with discounts
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <CheckCircle sx={{ color: '#10b981' }} />
                  <Box>
                    <Typography fontWeight={600}>
                      Data Migration Support
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Free onboarding & migration assistance
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <CheckCircle sx={{ color: '#10b981' }} />
                  <Box>
                    <Typography fontWeight={600}>SLA Guarantee</Typography>
                    <Typography variant="body2" color="#64748b">
                      99.9% uptime with dedicated SLAs
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box
        sx={{
          background: 'linear-gradient(105deg, #0f172a 0%, #1e1b2f 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} mb={2}>
            Ready to Elevate Your Operations?
          </Typography>
          <Typography sx={{ opacity: 0.8, mb: 4 }}>
            Join thousands of hospitality businesses using Bookmipg to
            streamline daily workflows and boost revenue.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#dc2626',
                borderRadius: '60px',
                px: 4,
                py: 1.2,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: '#b91c1c' },
              }}
            >
              Start 7-Day Free Trial
            </Button>
            <Button
              href="/contact"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                borderRadius: '60px',
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              Book Demo
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
