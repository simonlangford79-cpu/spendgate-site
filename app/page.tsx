'use client'

import { useEffect, useMemo, useState } from 'react'

type Status =
  | 'Pending Approval'
  | 'Rejected'
  | 'Awaiting Order'
  | 'Ordered'

type Page =
  | 'dashboard'
  | 'requests'
  | 'approvals'
  | 'queue'
  | 'control'
  | 'reports'
  | 'settings'

type Density = 'Comfortable' | 'Compact'

interface ApprovalStep {
  role: string
  label: string
  threshold?: number
}

interface ApprovalRule {
  id: string
  name: string
  venue: string
  category: string
  maxAmount?: number
  steps: ApprovalStep[]
}

interface RequestItem {
  id: string
  venue: string
  supplier: string
  category: string
  amount: number
  requester: string
  description: string
  urgentReason: string
  priority: boolean
  status: Status
  created: string
  approvalNote?: string
  buyerNote?: string
}

const initialRequests: RequestItem[] = [
  {
    id: 'JG-2026-0014',
    venue: 'The Oaks',
    supplier: 'Toolstation',
    category: 'Maintenance',
    amount: 145,
    requester: 'John Smith',
    description: 'Replacement fittings for irrigation repair',
    urgentReason: 'Leak affecting irrigation system',
    priority: true,
    status: 'Pending Approval',
    created: 'Today',
  },
  {
    id: 'JG-2026-0015',
    venue: 'Riverside',
    supplier: 'Makro',
    category: 'Bar Supplies',
    amount: 268,
    requester: 'Emma Taylor',
    description: 'Weekend event stock top-up',
    urgentReason: 'Corporate event Saturday',
    priority: false,
    status: 'Pending Approval',
    created: '1 day',
  },
  {
    id: 'JG-2026-0013',
    venue: 'The Pines',
    supplier: 'Screwfix',
    category: 'Maintenance',
    amount: 420,
    requester: 'Chris Adams',
    description: 'Drainage repair materials',
    urgentReason: 'Flooding near tee area',
    priority: true,
    status: 'Awaiting Order',
    created: '2 days',
  },
]

const initialApprovalRules: ApprovalRule[] = [
  {
    id: 'rule-1',
    name: 'Standard site approval',
    venue: 'All venues',
    category: 'All categories',
    maxAmount: 500,
    steps: [
      { role: 'Requester', label: 'Requester' },
      { role: 'Approver', label: 'Venue approver' },
    ],
  },
  {
    id: 'rule-2',
    name: 'High value escalation',
    venue: 'All venues',
    category: 'All categories',
    steps: [
      { role: 'Requester', label: 'Requester' },
      { role: 'Approver', label: 'Venue approver', threshold: 500 },
      { role: 'Final Approver', label: 'Regional / final approver', threshold: 500 },
    ],
  },
  {
    id: 'rule-3',
    name: 'Kitchen dual approval',
    venue: 'All venues',
    category: 'Kitchen',
    steps: [
      { role: 'Requester', label: 'Requester' },
      { role: 'Approver', label: 'Venue approver' },
      { role: 'Finance', label: 'Finance sign-off', threshold: 400 },
    ],
  },
]

const venueBudgets = {
  'The Oaks': {
    total: 6200,
    used: 3480,
  },
  Riverside: {
    total: 4900,
    used: 2180,
  },
  'The Pines': {
    total: 4300,
    used: 1960,
  },
} as const

const categoryBudgets = {
  Maintenance: {
    total: 3600,
    used: 2940,
  },
  'Bar Supplies': {
    total: 3000,
    used: 2110,
  },
  Kitchen: {
    total: 1800,
    used: 1240,
  },
  Cleaning: {
    total: 1400,
    used: 860,
  },
} as const

const preferredSuppliersByCategory: Record<string, string[]> = {
  Maintenance: ['Toolstation', 'Screwfix', 'Travis Perkins'],
  'Bar Supplies': ['Makro', 'Booker'],
  Kitchen: ['Nisbets'],
  Cleaning: ['Makro'],
}

const venueRiskScore: Record<string, number> = {
  'The Oaks': 82,
  Riverside: 64,
  'The Pines': 71,
}

const venueManagers: Record<string, string> = {
  'The Oaks': 'Simon',
  Riverside: 'Rachel Green',
  'The Pines': 'Chris Adams',
}

const companySites = ['All Sites', 'The Oaks', 'Riverside', 'The Pines']
const reportingPeriods = ['March 2026', 'Q1 2026', 'FY2026']
const navItems: Array<[Page, string, string]> = [
  ['dashboard', 'Dashboard', 'Executive view'],
  ['requests', 'Requests', 'Operational workspace'],
  ['approvals', 'Approvals', 'Decision console'],
  ['queue', 'Buyer Queue', 'Execution handoff'],
  ['control', 'Control Tower', 'Exceptions & risk'],
  ['reports', 'Reports', 'Spend analysis'],
  ['settings', 'Settings', 'Admin preview'],
]

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function formatCurrency(value: number) {
  return `£${value.toLocaleString()}`
}

function getRelativeAgeValue(created: string) {
  if (created === 'Today') return 0
  const match = created.match(/(\d+)/)
  return match ? Number(match[1]) : 0
}

function getBudgetState(request: RequestItem) {
  const venueBudget =
    venueBudgets[request.venue as keyof typeof venueBudgets] ?? {
      total: 5000,
      used: 2500,
    }

  const categoryBudget =
    categoryBudgets[request.category as keyof typeof categoryBudgets] ?? {
      total: 2000,
      used: 1000,
    }

  const venueRemaining = venueBudget.total - venueBudget.used
  const categoryRemaining = categoryBudget.total - categoryBudget.used

  const venueAfter = venueRemaining - request.amount
  const categoryAfter = categoryRemaining - request.amount

  const venueStatus =
    venueAfter < 0
      ? 'Over budget'
      : venueAfter < venueBudget.total * 0.1
        ? 'At risk'
        : 'Healthy'

  const categoryStatus =
    categoryAfter < 0
      ? 'Over budget'
      : categoryAfter < categoryBudget.total * 0.1
        ? 'At risk'
        : 'Healthy'

  return {
    venueBudget,
    categoryBudget,
    venueRemaining,
    categoryRemaining,
    venueAfter,
    categoryAfter,
    venueStatus,
    categoryStatus,
  }
}

function getMatchedApprovalRule(
  request: RequestItem,
  rules: ApprovalRule[]
): ApprovalRule {
  const specific =
    rules.find(
      (rule) =>
        (rule.venue === 'All venues' || rule.venue === request.venue) &&
        (rule.category === 'All categories' || rule.category === request.category) &&
        (rule.maxAmount === undefined || request.amount <= rule.maxAmount)
    ) ?? rules[0]

  const escalation =
    rules.find(
      (rule) =>
        (rule.venue === 'All venues' || rule.venue === request.venue) &&
        (rule.category === 'All categories' || rule.category === request.category) &&
        rule.maxAmount === undefined &&
        rule.steps.length >= 3 &&
        request.amount > 500
    ) ?? specific

  if (request.category === 'Kitchen' && request.amount > 400) {
    const kitchenRule = rules.find((rule) => rule.category === 'Kitchen')
    if (kitchenRule) return kitchenRule
  }

  if (request.amount > 500 && escalation) return escalation

  return specific
}

function getPolicySignals(request: RequestItem, rules: ApprovalRule[]) {
  const matchedRule = getMatchedApprovalRule(request, rules)
  const route: string[] = matchedRule.steps.map((step) => step.label)
  const rulesTriggered: string[] = []
  const flags: string[] = []

  if (request.amount > 500) {
    rulesTriggered.push('Amount threshold review')
    flags.push('Over £500')
  }

  if (request.amount > 1000) {
    rulesTriggered.push('Auto-escalate to regional approver')
    flags.push('Escalates over £1k')
  }

  if (request.priority) {
    rulesTriggered.push('Urgent workflow prioritised')
    flags.push('Urgent request')
  }

  if (request.category === 'Kitchen' && request.amount > 400) {
    rulesTriggered.push('Dual approval required')
    flags.push('Dual approval')
  }

  if (request.category === 'Maintenance' && request.amount > 800) {
    rulesTriggered.push('Facilities oversight required')
    flags.push('Facilities oversight')
  }

  if (request.status === 'Awaiting Order') {
    route.push('Buyer queue')
  }

  if (request.status === 'Ordered') {
    route.push('Order recorded')
  }

  return {
    matchedRule,
    rules: rulesTriggered.length ? rulesTriggered : ['Standard venue approval'],
    route,
    flags,
  }
}

function getSupplierSignal(request: RequestItem) {
  const preferred = preferredSuppliersByCategory[request.category] ?? []
  const isPreferred = preferred.includes(request.supplier)

  const lastPrice =
    request.supplier === 'Toolstation'
      ? 138
      : request.supplier === 'Makro'
        ? 221
        : request.supplier === 'Nisbets'
          ? 188
          : request.supplier === 'Booker'
            ? 198
            : 144

  const delta = request.amount - lastPrice
  const deltaPct = Math.round((delta / Math.max(lastPrice, 1)) * 100)

  const priceSignal =
    deltaPct >= 12
      ? 'Above normal'
      : deltaPct <= -8
        ? 'Good value'
        : 'Within normal range'

  const duplicateRisk =
    request.category === 'Bar Supplies' || request.supplier === 'Makro'
      ? 'Possible duplicate this week'
      : 'No duplicate pattern'

  return {
    preferred,
    isPreferred,
    lastPrice,
    deltaPct,
    priceSignal,
    duplicateRisk,
  }
}

function getDecisionRecommendation(
  request: RequestItem,
  approvalRules: ApprovalRule[]
) {
  const budget = getBudgetState(request)
  const policy = getPolicySignals(request, approvalRules)
  const supplier = getSupplierSignal(request)

  let tone: 'approve' | 'caution' | 'review' = 'approve'
  let title = 'Recommended: Approve'
  const reasons: string[] = []

  if (budget.venueAfter < 0 || budget.categoryAfter < 0) {
    tone = 'review'
    title = 'Review required: Budget exception'
    reasons.push('This request would push budget beyond available limits.')
  } else {
    reasons.push('Budget impact remains within expected operating tolerance.')
  }

  if (!supplier.isPreferred) {
    tone = tone === 'review' ? 'review' : 'caution'
    reasons.push('Supplier is not preferred for this category.')
  } else {
    reasons.push('Supplier matches preferred buying path for this category.')
  }

  if (supplier.deltaPct >= 12) {
    tone = tone === 'review' ? 'review' : 'caution'
    reasons.push(`Price is ${supplier.deltaPct}% above recent comparable spend.`)
  } else {
    reasons.push('Price sits within normal historical range.')
  }

  if (request.priority) {
    reasons.push('Urgency suggests operational disruption if delayed.')
  }

  if (policy.flags.includes('Dual approval')) {
    reasons.push('This request needs an additional approver before buyer handoff.')
  }

  if (policy.matchedRule.steps.length >= 3) {
    reasons.push(`Approval route includes ${policy.matchedRule.steps.length} workflow steps.`)
  }

  return {
    tone,
    title,
    reasons,
  }
}

function getRiskLevel(request: RequestItem, approvalRules: ApprovalRule[]) {
  const supplier = getSupplierSignal(request)
  const budget = getBudgetState(request)
  const policy = getPolicySignals(request, approvalRules)

  if (
    request.priority ||
    !supplier.isPreferred ||
    request.amount > 1000 ||
    budget.venueAfter < 0 ||
    budget.categoryAfter < 0 ||
    policy.matchedRule.steps.length >= 3
  ) {
    return 'High'
  }

  if (request.amount > 500 || supplier.duplicateRisk !== 'No duplicate pattern') {
    return 'Medium'
  }

  return 'Low'
}

export default function Prototype() {
  const [page, setPage] = useState<Page>('dashboard')
  const [role, setRole] = useState('Approver')
  const [darkMode, setDarkMode] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showNewPurchase, setShowNewPurchase] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [workspaceSite, setWorkspaceSite] = useState('All Sites')
  const [reportingPeriod, setReportingPeriod] = useState('March 2026')
  const [tableDensity, setTableDensity] = useState<Density>('Comfortable')

  const [requests, setRequests] = useState<RequestItem[]>(initialRequests)
  const [approvalRules, setApprovalRules] =
    useState<ApprovalRule[]>(initialApprovalRules)
  const [selectedId, setSelectedId] = useState('JG-2026-0014')
  const [search, setSearch] = useState('')
  const [scenario, setScenario] = useState('Normal Week')
  const [dataScale, setDataScale] = useState('Standard')
  const [activeSavedView, setActiveSavedView] = useState('All Requests')

  const [approvalNote, setApprovalNote] = useState('')
  const [rejectionReason, setRejectionReason] = useState('Over budget')

  const [venueFilter, setVenueFilter] = useState('All venues')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [categoryFilter, setCategoryFilter] = useState('All categories')

  const [activity, setActivity] = useState<string[]>([
    'JG-2026-0011 approved by Simon at 09:18',
    'JG-2026-0010 ordered by Rachel at 08:41',
    'JG-2026-0009 rejected at 08:15',
  ])

  const [notifications] = useState([
    '3 approvals waiting',
    '2 orders not yet placed',
    '1 urgent request submitted today',
  ])

  const [newPurchase, setNewPurchase] = useState({
    venue: 'The Oaks',
    supplier: '',
    category: 'Maintenance',
    amount: '',
    requester: 'John Smith',
    description: '',
    urgentReason: '',
    priority: false,
  })

  const [newRule, setNewRule] = useState({
    name: '',
    venue: 'All venues',
    category: 'All categories',
    amountBand: 'Over £500',
    requireFinalApproval: true,
    requireFinance: false,
  })

  const scopedRequests = useMemo(() => {
    if (workspaceSite === 'All Sites') return requests
    return requests.filter((r) => r.venue === workspaceSite)
  }, [requests, workspaceSite])

  const selected = useMemo(
    () => requests.find((r) => r.id === selectedId) ?? requests[0],
    [requests, selectedId]
  )

  const pending = useMemo(
    () => scopedRequests.filter((r) => r.status === 'Pending Approval'),
    [scopedRequests]
  )

  const awaiting = useMemo(
    () => scopedRequests.filter((r) => r.status === 'Awaiting Order'),
    [scopedRequests]
  )

  const rejected = useMemo(
    () => scopedRequests.filter((r) => r.status === 'Rejected'),
    [scopedRequests]
  )

  const ordered = useMemo(
    () => scopedRequests.filter((r) => r.status === 'Ordered'),
    [scopedRequests]
  )

  const priorityCount = scopedRequests.filter(
    (r) => r.priority && r.status === 'Pending Approval'
  ).length

  const avgApprovalHours = 6.2
  const slaBreaches = pending.filter((r) => r.created !== 'Today').length

  const venueSpend = useMemo(() => {
    const base = [
      { name: 'The Oaks', value: 3480 },
      { name: 'Riverside', value: 2180 },
      { name: 'The Pines', value: 1960 },
    ]

    if (workspaceSite === 'All Sites') return base
    return base.filter((item) => item.name === workspaceSite)
  }, [workspaceSite])

  const categorySpend = useMemo(() => {
    return [
      { name: 'Maintenance', value: 2940 },
      { name: 'Bar Supplies', value: 2110 },
      { name: 'Kitchen', value: 1240 },
      { name: 'Cleaning', value: 860 },
    ]
  }, [])

  const approvalVolume = [
    { label: 'W1', value: 14 },
    { label: 'W2', value: 18 },
    { label: 'W3', value: 12 },
    { label: 'W4', value: 21 },
  ]

  const supplierInsights = [
    {
      title: 'Toolstation',
      sub: '12 requests • avg £142',
      alert: '+12% vs last month',
    },
    {
      title: 'Makro',
      sub: '9 requests • avg £221',
      alert: 'Stable pricing',
    },
    {
      title: 'Nisbets',
      sub: '6 requests • avg £188',
      alert: '2 duplicate requests',
    },
  ]

  const exceptionItems = useMemo(() => {
    return scopedRequests
      .map((request) => {
        const policy = getPolicySignals(request, approvalRules)
        const supplier = getSupplierSignal(request)
        const budget = getBudgetState(request)
        const age = getRelativeAgeValue(request.created)

        const reasons: string[] = []

        if (request.priority && request.status === 'Pending Approval') {
          reasons.push('Urgent pending')
        }
        if (age >= 1 && request.status === 'Pending Approval') {
          reasons.push('Approval aging')
        }
        if (!supplier.isPreferred) reasons.push('Off-preferred supplier')
        if (supplier.duplicateRisk !== 'No duplicate pattern') {
          reasons.push('Duplicate risk')
        }
        if (budget.venueAfter < 0 || budget.categoryAfter < 0) {
          reasons.push('Budget exception')
        }
        if (policy.flags.includes('Dual approval')) {
          reasons.push('Dual approval route')
        }
        if (policy.matchedRule.steps.length >= 3) {
          reasons.push('Multi-step approval')
        }
        if (request.status === 'Awaiting Order' && age >= 2) {
          reasons.push('Buyer follow-up')
        }

        return {
          request,
          severity:
            reasons.includes('Budget exception') ||
            reasons.includes('Urgent pending')
              ? 'High'
              : reasons.includes('Approval aging') ||
                  reasons.includes('Off-preferred supplier')
                ? 'Medium'
                : 'Low',
          reasons,
        }
      })
      .filter((item) => item.reasons.length > 0)
  }, [scopedRequests, approvalRules])

  const savedViewFilteredRequests = useMemo(() => {
    let base = scopedRequests

    if (activeSavedView === 'My Approvals') {
      base = base.filter((r) => r.status === 'Pending Approval')
    }

    if (activeSavedView === 'Urgent') {
      base = base.filter((r) => r.priority)
    }

    if (activeSavedView === 'Over £500') {
      base = base.filter((r) => r.amount > 500)
    }

    if (activeSavedView === 'Awaiting Order') {
      base = base.filter((r) => r.status === 'Awaiting Order')
    }

    return base
  }, [scopedRequests, activeSavedView])

  const filteredRequests = useMemo(() => {
    const q = search.toLowerCase()

    return savedViewFilteredRequests.filter((r) => {
      const matchesSearch = [
        r.id,
        r.venue,
        r.supplier,
        r.category,
        r.requester,
        r.status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)

      const matchesVenue =
        venueFilter === 'All venues' || r.venue === venueFilter
      const matchesStatus =
        statusFilter === 'All statuses' || r.status === statusFilter
      const matchesCategory =
        categoryFilter === 'All categories' || r.category === categoryFilter

      return matchesSearch && matchesVenue && matchesStatus && matchesCategory
    })
  }, [
    savedViewFilteredRequests,
    search,
    venueFilter,
    statusFilter,
    categoryFilter,
  ])

  const controlledSpend = scopedRequests
    .filter((r) => r.status !== 'Rejected')
    .reduce((sum, r) => sum + r.amount, 0)

  const compliantSpend = scopedRequests
    .filter((r) => getSupplierSignal(r).isPreferred && r.status !== 'Rejected')
    .reduce((sum, r) => sum + r.amount, 0)

  const complianceRate =
    controlledSpend > 0
      ? Math.round((compliantSpend / controlledSpend) * 100)
      : 0

  const urgentSpendRate =
    controlledSpend > 0
      ? Math.round(
          (scopedRequests
            .filter((r) => r.priority && r.status !== 'Rejected')
            .reduce((sum, r) => sum + r.amount, 0) /
            controlledSpend) *
            100
        )
      : 0

  const offContractRate =
    scopedRequests.length > 0
      ? Math.round(
          (scopedRequests.filter((r) => !getSupplierSignal(r).isPreferred)
            .length /
            scopedRequests.length) *
            100
        )
      : 0

  const approvalBacklogAge =
    pending.length > 0
      ? (
          pending.reduce((sum, r) => sum + getRelativeAgeValue(r.created), 0) /
          pending.length
        ).toFixed(1)
      : '0.0'

  const buyerBacklogAge =
    awaiting.length > 0
      ? (
          awaiting.reduce((sum, r) => sum + getRelativeAgeValue(r.created), 0) /
          awaiting.length
        ).toFixed(1)
      : '0.0'

  const topInsightCards = [
    {
      title: 'Controlled spend',
      value: formatCurrency(controlledSpend),
      delta: '+12%',
      deltaTone: 'emerald' as const,
      sub: 'Approved or ordered operational spend',
      insight:
        workspaceSite === 'All Sites'
          ? '3 sites under active control'
          : `Scoped to ${workspaceSite}`,
    },
    {
      title: 'Compliant spend',
      value: `${complianceRate}%`,
      delta: complianceRate >= 80 ? 'On target' : 'Below target',
      deltaTone: complianceRate >= 80 ? ('emerald' as const) : ('amber' as const),
      sub: 'Using preferred suppliers',
      insight: `${Math.max(0, 100 - complianceRate)} pts from full compliance`,
    },
    {
      title: 'Urgent spend rate',
      value: `${urgentSpendRate}%`,
      delta: `${priorityCount} live`,
      deltaTone: priorityCount > 0 ? ('rose' as const) : ('slate' as const),
      sub: 'Flagged as operationally urgent',
      insight: priorityCount > 0 ? 'Needs rapid manager response' : 'Workload stable',
    },
    {
      title: 'Off-policy supplier rate',
      value: `${offContractRate}%`,
      delta: offContractRate > 20 ? 'Watchlist' : 'Contained',
      deltaTone: offContractRate > 20 ? ('amber' as const) : ('emerald' as const),
      sub: 'Requests outside preferred path',
      insight: 'Opportunity to standardise routing',
    },
    {
      title: 'Approval backlog age',
      value: `${approvalBacklogAge}d`,
      delta: `${slaBreaches} near SLA`,
      deltaTone: slaBreaches > 0 ? ('rose' as const) : ('emerald' as const),
      sub: 'Average age of pending approvals',
      insight: pending.length > 0 ? `${pending.length} awaiting decision` : 'No active backlog',
    },
    {
      title: 'Buyer backlog age',
      value: `${buyerBacklogAge}d`,
      delta: `${awaiting.length} queue`,
      deltaTone: awaiting.length > 1 ? ('amber' as const) : ('emerald' as const),
      sub: 'Average age awaiting order',
      insight: 'Execution handoff health',
    },
  ]

  function addActivity(text: string) {
    setActivity((prev) => [text, ...prev].slice(0, 14))
  }

  function openApprovalModal(id: string) {
    setSelectedId(id)
    setShowApprovalModal(true)
  }

  function closeApprovalModal() {
    setShowApprovalModal(false)
    setApprovalNote('')
  }

  function approve(id: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Awaiting Order',
              approvalNote: approvalNote || 'Approved for purchase',
            }
          : r
      )
    )
    addActivity(`${id} approved by Simon just now`)
    setApprovalNote('')
    setShowApprovalModal(false)
  }

  function reject(id: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Rejected',
              approvalNote: `${rejectionReason}${approvalNote ? ` — ${approvalNote}` : ''}`,
            }
          : r
      )
    )
    addActivity(`${id} rejected by Simon just now`)
    setApprovalNote('')
    setShowApprovalModal(false)
  }

  function markOrdered(id: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Ordered',
              buyerNote: 'Marked as ordered in prototype',
            }
          : r
      )
    )
    addActivity(`${id} marked ordered by Rachel just now`)
  }

  function createPurchase(e: React.FormEvent) {
    e.preventDefault()

    const nextNumber = requests.length + 17
    const id = `JG-2026-${String(nextNumber).padStart(4, '0')}`

    const item: RequestItem = {
      id,
      venue: newPurchase.venue,
      supplier: newPurchase.supplier,
      category: newPurchase.category,
      amount: Number(newPurchase.amount || 0),
      requester: newPurchase.requester,
      description: newPurchase.description,
      urgentReason: newPurchase.urgentReason,
      priority: newPurchase.priority,
      status: 'Pending Approval',
      created: 'Today',
    }

    setRequests((prev) => [item, ...prev])
    setSelectedId(id)
    setShowNewPurchase(false)
    setPage('requests')
    setActiveSavedView('All Requests')
    addActivity(`${id} submitted by ${item.requester} just now`)

    setNewPurchase({
      venue: 'The Oaks',
      supplier: '',
      category: 'Maintenance',
      amount: '',
      requester: 'John Smith',
      description: '',
      urgentReason: '',
      priority: false,
    })
  }

  function addApprovalRule(e: React.FormEvent) {
    e.preventDefault()

    const steps: ApprovalStep[] = [
      { role: 'Requester', label: 'Requester' },
      { role: 'Approver', label: 'Venue approver' },
    ]

    if (newRule.requireFinalApproval) {
      steps.push({
        role: 'Final Approver',
        label: 'Final approver',
        threshold: newRule.amountBand === 'Over £500' ? 500 : 1000,
      })
    }

    if (newRule.requireFinance) {
      steps.push({
        role: 'Finance',
        label: 'Finance sign-off',
        threshold: newRule.amountBand === 'Over £500' ? 500 : 1000,
      })
    }

    const item: ApprovalRule = {
      id: `rule-${Date.now()}`,
      name: newRule.name || 'Custom approval rule',
      venue: newRule.venue,
      category: newRule.category,
      maxAmount: newRule.amountBand === 'Up to £500' ? 500 : undefined,
      steps,
    }

    setApprovalRules((prev) => [item, ...prev])
    setNewRule({
      name: '',
      venue: 'All venues',
      category: 'All categories',
      amountBand: 'Over £500',
      requireFinalApproval: true,
      requireFinance: false,
    })
    addActivity(`Approval rule added: ${item.name}`)
  }
  function loadScenario(name: string) {
    setScenario(name)

    if (name === 'Urgent Facilities Issue') {
      const next = [
        {
          id: 'JG-2026-0091',
          venue: 'The Oaks',
          supplier: 'Travis Perkins',
          category: 'Maintenance',
          amount: 1180,
          requester: 'John Smith',
          description: 'Emergency repair materials for burst pipe',
          urgentReason: 'Water leak affecting operations',
          priority: true,
          status: 'Pending Approval' as Status,
          created: 'Today',
        },
        ...initialRequests,
      ]
      setRequests(next)
      setSelectedId('JG-2026-0091')
      setPage('control')
      setWorkspaceSite('The Oaks')
    }

    if (name === 'Month End Backlog') {
      const next = [
        ...initialRequests,
        {
          id: 'JG-2026-0088',
          venue: 'Riverside',
          supplier: 'Nisbets',
          category: 'Kitchen',
          amount: 690,
          requester: 'Emma Taylor',
          description: 'Replacement prep equipment',
          urgentReason: 'Existing kit failing intermittently',
          priority: false,
          status: 'Awaiting Order' as Status,
          created: '3 days',
        },
        {
          id: 'JG-2026-0089',
          venue: 'The Pines',
          supplier: 'Makro',
          category: 'Bar Supplies',
          amount: 332,
          requester: 'Chris Adams',
          description: 'Stock replenishment for event weekend',
          urgentReason: 'Member event demand spike',
          priority: true,
          status: 'Pending Approval' as Status,
          created: 'Today',
        },
      ]
      setRequests(next)
      setSelectedId('JG-2026-0089')
      setPage('control')
      setWorkspaceSite('All Sites')
    }

    if (name === 'Weekend Event Surge') {
      const next = [
        ...initialRequests,
        {
          id: 'JG-2026-0094',
          venue: 'Riverside',
          supplier: 'Makro',
          category: 'Bar Supplies',
          amount: 540,
          requester: 'Emma Taylor',
          description: 'Weekend member event drinks uplift',
          urgentReason: 'High expected guest volume',
          priority: true,
          status: 'Pending Approval' as Status,
          created: 'Today',
        },
        {
          id: 'JG-2026-0095',
          venue: 'The Oaks',
          supplier: 'Booker',
          category: 'Bar Supplies',
          amount: 410,
          requester: 'Rachel Green',
          description: 'Extra soft drinks and mixers',
          urgentReason: 'Outdoor event and hospitality demand',
          priority: false,
          status: 'Awaiting Order' as Status,
          created: 'Today',
        },
      ]
      setRequests(next)
      setSelectedId('JG-2026-0094')
      setPage('dashboard')
      setWorkspaceSite('All Sites')
    }

    if (name === 'Finance Review') {
      setPage('reports')
      setRequests(initialRequests)
      setSelectedId('JG-2026-0014')
      setWorkspaceSite('All Sites')
      setReportingPeriod('Q1 2026')
    }

    if (name === 'Normal Week') {
      setRequests(initialRequests)
      setSelectedId('JG-2026-0014')
      setPage('dashboard')
      setWorkspaceSite('All Sites')
      setReportingPeriod('March 2026')
    }

    addActivity(`Demo scenario loaded: ${name}`)
  }

  function generateDemoData() {
    const venues = ['The Oaks', 'Riverside', 'The Pines']
    const suppliers = [
      'Toolstation',
      'Makro',
      'Nisbets',
      'Booker',
      'Screwfix',
      'Travis Perkins',
    ]
    const categories = ['Maintenance', 'Bar Supplies', 'Kitchen', 'Cleaning']
    const statuses: Status[] = [
      'Pending Approval',
      'Awaiting Order',
      'Rejected',
      'Ordered',
    ]

    const generated: RequestItem[] = Array.from({ length: 24 }, (_, i) => ({
      id: `JG-2026-${String(200 + i).padStart(4, '0')}`,
      venue: venues[i % venues.length],
      supplier: suppliers[i % suppliers.length],
      category: categories[i % categories.length],
      amount: 80 + i * 47,
      requester: ['John Smith', 'Emma Taylor', 'Chris Adams', 'Rachel Green'][i % 4],
      description: `Generated demo request ${i + 1}`,
      urgentReason:
        i % 5 === 0 ? 'Urgent operational need' : 'Routine replenishment',
      priority: i % 4 === 0,
      status: statuses[i % statuses.length],
      created: i % 3 === 0 ? 'Today' : `${(i % 5) + 1} days`,
    }))

    setRequests(generated)
    setSelectedId(generated[0].id)
    setDataScale('Generated')
    setPage('control')
    setWorkspaceSite('All Sites')
    addActivity('Generated 24 demo requests')
  }

  function exportReportsCsv() {
    const rows = [
      ['Metric', 'Value'],
      ['Pending approvals', String(pending.length)],
      ['Awaiting order', String(awaiting.length)],
      ['Rejected', String(rejected.length)],
      ['Ordered', String(ordered.length)],
      ['Average approval time (hrs)', String(avgApprovalHours)],
      ['SLA breaches', String(slaBreaches)],
      ['Compliant spend rate', `${complianceRate}%`],
      ['Urgent spend rate', `${urgentSpendRate}%`],
      ['Off-preferred supplier rate', `${offContractRate}%`],
      [],
      ['Venue', 'Spend'],
      ...venueSpend.map((v) => [v.name, String(v.value)]),
      [],
      ['Category', 'Spend'],
      ...categorySpend.map((c) => [c.name, String(c.value)]),
    ]

    const csv = rows
      .map((r) =>
        r.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'spendgate-report.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    addActivity('Reports exported to Excel-compatible CSV')
  }

  const commandItems = useMemo(() => {
    const pageCommands = [
      { label: 'Go to Dashboard', group: 'Navigate', fn: () => setPage('dashboard') },
      { label: 'Go to Requests', group: 'Navigate', fn: () => setPage('requests') },
      { label: 'Go to Approvals', group: 'Navigate', fn: () => setPage('approvals') },
      { label: 'Go to Buyer Queue', group: 'Navigate', fn: () => setPage('queue') },
      { label: 'Go to Control Tower', group: 'Navigate', fn: () => setPage('control') },
      { label: 'Go to Reports', group: 'Navigate', fn: () => setPage('reports') },
      { label: 'Go to Settings', group: 'Navigate', fn: () => setPage('settings') },
      {
        label: 'Create New Purchase',
        group: 'Actions',
        fn: () => setShowNewPurchase(true),
      },
      {
        label: 'Generate Demo Data',
        group: 'Actions',
        fn: generateDemoData,
      },
      {
        label: 'Toggle Light / Dark Mode',
        group: 'Actions',
        fn: () => setDarkMode((v) => !v),
      },
      {
        label: 'Load Scenario: Month End Backlog',
        group: 'Scenarios',
        fn: () => loadScenario('Month End Backlog'),
      },
      {
        label: 'Load Scenario: Weekend Event Surge',
        group: 'Scenarios',
        fn: () => loadScenario('Weekend Event Surge'),
      },
      {
        label: 'Load Scenario: Urgent Facilities Issue',
        group: 'Scenarios',
        fn: () => loadScenario('Urgent Facilities Issue'),
      },
    ]

    const requestCommands = requests.slice(0, 8).map((r) => ({
      label: `Open ${r.id} • ${r.venue} • ${formatCurrency(r.amount)}`,
      group: 'Requests',
      fn: () => {
        setSelectedId(r.id)
        if (r.status === 'Pending Approval') setPage('approvals')
        else if (r.status === 'Awaiting Order') setPage('queue')
        else setPage('requests')
      },
    }))

    return [...pageCommands, ...requestCommands]
  }, [requests])

  const filteredCommandItems = useMemo(() => {
    const q = commandQuery.trim().toLowerCase()
    if (!q) return commandItems
    return commandItems.filter((item) =>
      item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    )
  }, [commandItems, commandQuery])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setShowCommandPalette((v) => !v)
      }

      if (role === 'Approver' && selected && selected.status === 'Pending Approval') {
        if (e.key.toLowerCase() === 'a') {
          e.preventDefault()
          openApprovalModal(selected.id)
        }
        if (e.key.toLowerCase() === 'r') {
          e.preventDefault()
          openApprovalModal(selected.id)
        }
      }

      if (role === 'Buyer' && selected && selected.status === 'Awaiting Order') {
        if (e.key.toLowerCase() === 'o') {
          e.preventDefault()
          markOrdered(selected.id)
        }
      }

      if (e.key === 'Escape') {
        setShowCommandPalette(false)
        setShowNewPurchase(false)
        setShowNotifications(false)
        setShowApprovalModal(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [role, selected])

  const decision = selected ? getDecisionRecommendation(selected, approvalRules) : null
  const budgetState = selected ? getBudgetState(selected) : null
  const policySignals = selected
    ? getPolicySignals(selected, approvalRules)
    : null
  const supplierSignal = selected ? getSupplierSignal(selected) : null

  const pageLabel: Record<Page, string> = {
    dashboard: 'Executive Dashboard',
    requests: 'Requests Workspace',
    approvals: 'Approvals Console',
    queue: 'Buyer Queue',
    control: 'Control Tower',
    reports: 'Reports',
    settings: 'Settings',
  }

  const pageSubtitle: Record<Page, string> = {
    dashboard: 'Portfolio view across operational spend, policy, and execution.',
    requests: 'Live request workspace with filters, saved views, and fast triage.',
    approvals: 'Decision-ready approval queue with full-screen approval review.',
    queue: 'Approved spend waiting for purchasing execution.',
    control: 'Exception management across sites, suppliers, and budget pressure.',
    reports: 'Spend performance, compliance, and export surfaces.',
    settings: 'Approval routing, guardrails, and governance configuration.',
  }

  const themeWrapper = darkMode ? 'dark' : ''

  return (
    <div className={themeWrapper}>
      <ForceWhiteTheme />
      <div className="min-h-screen bg-white text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        <div className="flex min-h-screen">
          <aside className="hidden w-[290px] border-r border-slate-200 bg-white px-6 py-6 xl:block dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-sm">
                  SG
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Operational Spend Control
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                    Spend<span className="text-emerald-600">Gate</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 max-w-[220px] text-sm leading-6 text-slate-500">
                Multi-site spend controls for venue operators, buyers, and finance.
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Workspace
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-950 dark:text-slate-100">
                    Jess Golf Group
                  </div>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  Demo
                </span>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    Scope
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-100">
                    {workspaceSite}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    Period
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-100">
                    {reportingPeriod}
                  </div>
                </div>
              </div>
            </div>

            <nav className="mt-8 space-y-2">
              {navItems.map(([id, label, sub]) => {
                const active = page === id
                return (
                  <button
                    key={id}
                    onClick={() => setPage(id)}
                    className={cn(
                      'group w-full rounded-[1.35rem] px-4 py-3.5 text-left transition-all duration-150',
                      active
                        ? 'border border-slate-200 bg-slate-950 text-white shadow-sm dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900'
                        : 'border border-transparent text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold">{label}</div>
                        <div
                          className={cn(
                            'mt-1 text-xs',
                            active
                              ? 'text-slate-300 dark:text-slate-600'
                              : 'text-slate-500'
                          )}
                        >
                          {sub}
                        </div>
                      </div>
                      <div
                        className={cn(
                          'h-2.5 w-2.5 rounded-full transition-all',
                          active
                            ? 'bg-emerald-400 dark:bg-emerald-500'
                            : 'bg-slate-200 group-hover:bg-slate-300 dark:bg-slate-700 dark:group-hover:bg-slate-600'
                        )}
                      />
                    </div>
                  </button>
                )
              })}
            </nav>

            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Demo controls
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-xs text-slate-500">View as role</div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option>Requester</option>
                    <option>Approver</option>
                    <option>Buyer</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div>
                  <div className="text-xs text-slate-500">Saved views</div>
                  <div className="mt-2 grid gap-2">
                    {[
                      'All Requests',
                      'My Approvals',
                      'Urgent',
                      'Over £500',
                      'Awaiting Order',
                    ].map((view) => (
                      <button
                        key={view}
                        onClick={() => {
                          setActiveSavedView(view)
                          if (view === 'My Approvals') setPage('approvals')
                          else if (view === 'Awaiting Order') setPage('queue')
                          else setPage('requests')
                        }}
                        className={cn(
                          'rounded-2xl border px-3 py-2.5 text-left text-sm transition-all',
                          activeSavedView === view
                            ? 'border-slate-950 bg-slate-950 text-white shadow-sm dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                        )}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Workflow signals
                  </div>
                  <div className="mt-3 space-y-2">
                    <SignalRow label="Pending approvals" value={pending.length} />
                    <SignalRow label="Buyer queue" value={awaiting.length} />
                    <SignalRow label="Exceptions" value={exceptionItems.length} />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-6 xl:p-8">
            <div className="mx-auto max-w-[1720px] space-y-6">
              <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="space-y-5">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <TopPill text="SpendGate" />
                        <TopPill text="Jess Golf Group" />
                        <TopPill text={workspaceSite} emphasized />
                        <TopPill text={reportingPeriod} />
                        <TopPill text={role} />
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Multi-site operational spend control
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100 md:text-[2rem]">
                          {pageLabel[page]}
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {pageSubtitle[page]}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:flex-wrap xl:justify-end">
                      <button
                        onClick={() => setShowNotifications((v) => !v)}
                        className="relative rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        Notifications
                        <span className="absolute -right-1.5 -top-1.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {notifications.length}
                        </span>
                      </button>

                      <button
                        onClick={() => setShowCommandPalette(true)}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        ⌘K Command
                      </button>

                      <button
                        onClick={generateDemoData}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        Generate Demo Data
                      </button>

                      <button
                        onClick={() => setDarkMode((v) => !v)}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        {darkMode ? 'Light' : 'Dark'} Mode
                      </button>

                      <button
                        onClick={() => setShowNewPurchase(true)}
                        className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                      >
                        + New Purchase
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 xl:grid-cols-[1.2fr_1.1fr_0.9fr_0.9fr]">
                    <ControlSelect
                      label="Entity scope"
                      value={workspaceSite}
                      onChange={setWorkspaceSite}
                      options={companySites}
                    />
                    <ControlSelect
                      label="Reporting period"
                      value={reportingPeriod}
                      onChange={setReportingPeriod}
                      options={reportingPeriods}
                    />
                    <ControlSelect
                      label="Demo scenario"
                      value={scenario}
                      onChange={loadScenario}
                      options={[
                        'Normal Week',
                        'Urgent Facilities Issue',
                        'Month End Backlog',
                        'Weekend Event Surge',
                        'Finance Review',
                      ]}
                    />
                    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Workspace status
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                            {dataScale} dataset
                          </div>
                          <div className="text-xs text-slate-500">
                            Light-theme-first product narrative
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                          Live demo
                        </span>
                      </div>
                    </div>
                  </div>

                  {showNotifications && (
                    <div className="absolute right-8 top-28 z-40 w-[26rem] rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Notifications
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            Live workflow signals
                          </div>
                        </div>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                        >
                          Close
                        </button>
                      </div>

                      <div className="mt-4 space-y-2">
                        {notifications.map((n, i) => (
                          <div
                            key={n}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                                {n}
                              </div>
                              <span
                                className={cn(
                                  'rounded-full px-2.5 py-1 text-[10px] font-semibold',
                                  i === 0
                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                                    : i === 1
                                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                                )}
                              >
                                Active
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {topInsightCards.map((card) => (
                  <PremiumMetricCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    delta={card.delta}
                    deltaTone={card.deltaTone}
                    sub={card.sub}
                    insight={card.insight}
                  />
                ))}
              </section>

              <div className="grid gap-6 xl:grid-cols-[1fr]">
                <div className="space-y-6">
                  {page === 'dashboard' && (
                    <>
                      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
                        <Panel
                          title="Group control overview"
                          subtitle="Portfolio-level view of sites, policy discipline, and operating pressure"
                        >
                          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <KpiTile
                              label="Pending approvals"
                              value={pending.length}
                              tone="neutral"
                            />
                            <KpiTile
                              label="Priority pending"
                              value={priorityCount}
                              tone="rose"
                            />
                            <KpiTile
                              label="Awaiting order"
                              value={awaiting.length}
                              tone="amber"
                            />
                            <KpiTile
                              label="SLA breaches"
                              value={slaBreaches}
                              tone="slate"
                            />
                          </div>

                          <div className="mt-6 grid gap-4 lg:grid-cols-3">
                            {venueSpend.map((venue) => {
                              const score = venueRiskScore[venue.name] ?? 70
                              return (
                                <VenueScorecard
                                  key={venue.name}
                                  venue={venue.name}
                                  spend={venue.value}
                                  riskScore={score}
                                  compliance={
                                    venue.name === 'The Oaks'
                                      ? 92
                                      : venue.name === 'Riverside'
                                        ? 78
                                        : 84
                                  }
                                  urgentRate={
                                    venue.name === 'The Oaks'
                                      ? 18
                                      : venue.name === 'Riverside'
                                        ? 26
                                        : 21
                                  }
                                  onOpen={() => {
                                    const first = requests.find(
                                      (r) => r.venue === venue.name
                                    )
                                    if (first) setSelectedId(first.id)
                                    setWorkspaceSite(venue.name)
                                    setPage('control')
                                  }}
                                />
                              )
                            })}
                          </div>
                        </Panel>

                        <Panel
                          title="Control priorities"
                          subtitle="What a regional operator should handle first"
                        >
                          <div className="space-y-3">
                            <PriorityActionCard
                              title="Urgent approvals"
                              value={`${pending.filter((r) => r.priority).length} requests`}
                              sub="Operational issues that may disrupt service"
                              action="Open Control Tower"
                              onClick={() => setPage('control')}
                              tone="rose"
                            />
                            <PriorityActionCard
                              title="Buyer execution lag"
                              value={`${awaiting.length} in queue`}
                              sub="Approved spend still waiting for order placement"
                              action="Go to Buyer Queue"
                              onClick={() => setPage('queue')}
                              tone="amber"
                            />
                            <PriorityActionCard
                              title="Supplier compliance"
                              value={`${offContractRate}% off-path`}
                              sub="Requests not using preferred supplier routes"
                              action="Review Requests"
                              onClick={() => setPage('requests')}
                              tone="slate"
                            />
                          </div>
                        </Panel>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-2">
                        <Panel
                          title="Approval queue"
                          subtitle="Fast decision view with modal-based approval review"
                        >
                          <div className="space-y-3">
                            {pending.map((r) => (
                              <button
                                key={r.id}
                                onClick={() => {
                                  setPage('approvals')
                                  openApprovalModal(r.id)
                                }}
                                className="block w-full rounded-[1.35rem] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                                      {r.id}
                                    </div>
                                    <div className="mt-1 text-sm text-slate-500">
                                      {r.venue} • {r.supplier} • {formatCurrency(r.amount)}
                                    </div>
                                    <div className="mt-2 text-xs text-slate-500">
                                      {r.description}
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-2">
                                    <StatusChip
                                      label={r.priority ? 'Priority' : 'Pending'}
                                      tone={r.priority ? 'rose' : 'blue'}
                                    />
                                    <div className="text-xs text-slate-500">
                                      {r.created}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </Panel>

                        <Panel
                          title="AI spend intelligence"
                          subtitle="Insight blocks to make the demo feel decision-native"
                        >
                          <div className="grid gap-3">
                            <Insight
                              title="Top venue risk"
                              value="Riverside"
                              sub="Highest urgent-spend rate this week"
                            />
                            <Insight
                              title="Likely savings"
                              value="£420"
                              sub="From shifting 3 requests to preferred suppliers"
                            />
                            <Insight
                              title="Approval velocity"
                              value="6.2 hours"
                              sub="Average time to manager decision"
                            />
                            <Insight
                              title="Duplicate signals"
                              value="2 requests"
                              sub="Potentially overlapping bar supply requests"
                            />
                          </div>
                        </Panel>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-2">
                        <Panel
                          title="Recent activity"
                          subtitle="Cross-role operational feed"
                        >
                          <div className="space-y-3">
                            {activity.map((item) => (
                              <div
                                key={item}
                                className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </Panel>

                        <Panel
                          title="Management signals"
                          subtitle="Controls leadership can act on"
                        >
                          <div className="grid gap-3">
                            <Insight
                              title="Spend under management"
                              value={formatCurrency(controlledSpend)}
                              sub="Tracked through approval and buyer workflows"
                            />
                            <Insight
                              title="Policy-compliant requests"
                              value={`${complianceRate}%`}
                              sub="Based on preferred supplier alignment"
                            />
                            <Insight
                              title="Urgent workload"
                              value={`${priorityCount} approvals`}
                              sub="Requires fast operational response"
                            />
                            <Insight
                              title="Exception volume"
                              value={`${exceptionItems.length} items`}
                              sub="Requests with policy, budget, or routing signals"
                            />
                          </div>
                        </Panel>
                      </div>
                    </>
                  )}

                  {(page === 'requests' || page === 'approvals') && (
                    <Panel
                      title={
                        page === 'approvals'
                          ? 'Approvals waiting for decision'
                          : 'Requests workspace'
                      }
                      subtitle="A cleaner white data-grid workspace with modal approval review"
                    >
                      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                          <div className="flex-1">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Saved views
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {[
                                'All Requests',
                                'My Approvals',
                                'Urgent',
                                'Over £500',
                                'Awaiting Order',
                              ].map((view) => (
                                <button
                                  key={view}
                                  onClick={() => setActiveSavedView(view)}
                                  className={cn(
                                    'rounded-full px-3.5 py-2 text-xs font-semibold transition',
                                    activeSavedView === view
                                      ? 'bg-slate-950 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900'
                                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800'
                                  )}
                                >
                                  {view}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                setTableDensity((v) =>
                                  v === 'Comfortable' ? 'Compact' : 'Comfortable'
                                )
                              }
                              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                              Density: {tableDensity}
                            </button>
                            <button
                              onClick={() => {
                                setSearch('')
                                setVenueFilter('All venues')
                                setStatusFilter('All statuses')
                                setCategoryFilter('All categories')
                              }}
                              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                              Reset filters
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 xl:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr]">
                          <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by request, supplier, venue, requester..."
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          />

                          <select
                            value={venueFilter}
                            onChange={(e) => setVenueFilter(e.target.value)}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                          >
                            <option>All venues</option>
                            <option>The Oaks</option>
                            <option>Riverside</option>
                            <option>The Pines</option>
                          </select>

                          <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                          >
                            <option>All categories</option>
                            <option>Maintenance</option>
                            <option>Bar Supplies</option>
                            <option>Kitchen</option>
                            <option>Cleaning</option>
                          </select>

                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                          >
                            <option>All statuses</option>
                            <option>Pending Approval</option>
                            <option>Awaiting Order</option>
                            <option>Rejected</option>
                            <option>Ordered</option>
                          </select>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <QuickFilterPill
                            label="All"
                            active={activeSavedView === 'All Requests'}
                            onClick={() => setActiveSavedView('All Requests')}
                          />
                          <QuickFilterPill
                            label="My Requests"
                            active={false}
                            onClick={() => setSearch('')}
                          />
                          <QuickFilterPill
                            label="Waiting approval"
                            active={activeSavedView === 'My Approvals'}
                            onClick={() => setActiveSavedView('My Approvals')}
                          />
                          <QuickFilterPill
                            label="Policy issues"
                            active={activeSavedView === 'Over £500'}
                            onClick={() => setActiveSavedView('Over £500')}
                          />
                          <QuickFilterPill
                            label="Over budget"
                            active={search === 'Over budget'}
                            onClick={() => setSearch('Over budget')}
                          />
                        </div>
                      </div>

                      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-slate-700">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[1020px] text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/80">
                              <tr>
                                <th className="px-4 py-3 font-semibold">Request</th>
                                <th className="px-4 py-3 font-semibold">Site / Supplier</th>
                                <th className="px-4 py-3 font-semibold">Category</th>
                                <th className="px-4 py-3 font-semibold">Amount</th>
                                <th className="px-4 py-3 font-semibold">Approval path</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900">
                              {filteredRequests
                                .filter((r) =>
                                  page === 'approvals'
                                    ? r.status === 'Pending Approval'
                                    : true
                                )
                                .map((r) => {
                                  const supplier = getSupplierSignal(r)
                                  const policy = getPolicySignals(r, approvalRules)
                                  const risk = getRiskLevel(r, approvalRules)
                                  const compact = tableDensity === 'Compact'

                                  return (
                                    <tr
                                      key={r.id}
                                      onClick={() => setSelectedId(r.id)}
                                      className={cn(
                                        'group cursor-pointer border-t border-slate-100 transition-all hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/80',
                                        selectedId === r.id &&
                                          'bg-slate-50 dark:bg-slate-800/80'
                                      )}
                                    >
                                      <td className={cn('px-4', compact ? 'py-3' : 'py-4')}>
                                        <div className="flex items-start gap-3">
                                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                          <div>
                                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                                              {r.id}
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500">
                                              {r.requester} • {r.created}
                                            </div>
                                            {!compact && (
                                              <div className="mt-2 max-w-[270px] text-xs text-slate-500">
                                                {r.description}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </td>

                                      <td className={cn('px-4', compact ? 'py-3' : 'py-4')}>
                                        <div className="font-medium text-slate-900 dark:text-slate-100">
                                          {r.venue}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">
                                          {r.supplier}
                                        </div>
                                      </td>

                                      <td className={cn('px-4', compact ? 'py-3' : 'py-4')}>
                                        <div className="text-slate-700 dark:text-slate-200">
                                          {r.category}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">
                                          {supplier.isPreferred
                                            ? 'Preferred route'
                                            : 'Off-preferred'}
                                        </div>
                                      </td>

                                      <td className={cn('px-4', compact ? 'py-3' : 'py-4')}>
                                        <div className="font-semibold text-slate-950 dark:text-slate-100">
                                          {formatCurrency(r.amount)}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">
                                          {risk} risk
                                        </div>
                                      </td>

                                      <td className={cn('px-4', compact ? 'py-3' : 'py-4')}>
                                        <div className="flex flex-wrap gap-2">
                                          <Badge
                                            label={policy.matchedRule.name}
                                            tone="slate"
                                          />
                                          <Badge
                                            label={`${policy.matchedRule.steps.length} steps`}
                                            tone={
                                              policy.matchedRule.steps.length >= 3
                                                ? 'amber'
                                                : 'emerald'
                                            }
                                          />
                                        </div>
                                      </td>

                                      <td className={cn('px-4', compact ? 'py-3' : 'py-4')}>
                                        <StatusChip
                                          label={r.status}
                                          tone={
                                            r.status === 'Pending Approval'
                                              ? 'blue'
                                              : r.status === 'Awaiting Order'
                                                ? 'amber'
                                                : r.status === 'Rejected'
                                                  ? 'rose'
                                                  : 'emerald'
                                          }
                                        />
                                      </td>

                                      <td
                                        className={cn(
                                          'px-4 text-right',
                                          compact ? 'py-3' : 'py-4'
                                        )}
                                      >
                                        <div className="flex justify-end gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setSelectedId(r.id)
                                            }}
                                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                          >
                                            View
                                          </button>

                                          {page === 'approvals' &&
                                            role === 'Approver' &&
                                            r.status === 'Pending Approval' && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  openApprovalModal(r.id)
                                                }}
                                                className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                                              >
                                                Review
                                              </button>
                                            )}

                                          {role === 'Buyer' &&
                                            r.status === 'Awaiting Order' && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  markOrdered(r.id)
                                                }}
                                                className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
                                              >
                                                Ordered
                                              </button>
                                            )}
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Panel>
                  )}

                  {page === 'queue' && (
                    <Panel
                      title="Buyer queue"
                      subtitle="Approved spend waiting for order placement"
                    >
                      <div className="grid gap-4 md:grid-cols-3">
                        <MiniMetric
                          label="Awaiting order"
                          value={awaiting.length}
                          sub="Approved and ready to place"
                        />
                        <MiniMetric
                          label="Avg queue age"
                          value={`${buyerBacklogAge}d`}
                          sub="Buyer workload freshness"
                        />
                        <MiniMetric
                          label="Potentially urgent"
                          value={awaiting.filter((r) => r.priority).length}
                          sub="Could disrupt operations"
                        />
                      </div>

                      <div className="mt-5 space-y-4">
                        {awaiting.map((r) => {
                          const supplier = getSupplierSignal(r)
                          return (
                            <div
                              key={r.id}
                              className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                                      {r.id}
                                    </div>
                                    <StatusChip
                                      label={r.priority ? 'Priority' : 'Buyer ready'}
                                      tone={r.priority ? 'rose' : 'amber'}
                                    />
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    {r.venue} • {r.supplier} • {r.category}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-300">
                                    {r.description}
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Badge
                                      label={
                                        supplier.isPreferred
                                          ? 'Preferred supplier'
                                          : 'Off-preferred supplier'
                                      }
                                      tone={supplier.isPreferred ? 'emerald' : 'slate'}
                                    />
                                    <Badge label={`Created ${r.created}`} tone="slate" />
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <div className="text-sm text-slate-500">Amount</div>
                                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                      {formatCurrency(r.amount)}
                                    </div>
                                  </div>
                                  {role === 'Buyer' && (
                                    <button
                                      onClick={() => markOrdered(r.id)}
                                      className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
                                    >
                                      Mark Ordered
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </Panel>
                  )}

                  {page === 'control' && (
                    <>
                      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                        <Panel
                          title="Control Tower"
                          subtitle="Exception management across approvals, suppliers, and budgets"
                        >
                          <div className="grid gap-4 md:grid-cols-4">
                            <MiniMetric
                              label="Exception items"
                              value={exceptionItems.length}
                              sub="Policy, budget, or routing signals"
                            />
                            <MiniMetric
                              label="Urgent pending"
                              value={
                                scopedRequests.filter(
                                  (r) => r.priority && r.status === 'Pending Approval'
                                ).length
                              }
                              sub="Needs immediate attention"
                            />
                            <MiniMetric
                              label="Off-path suppliers"
                              value={
                                scopedRequests.filter(
                                  (r) => !getSupplierSignal(r).isPreferred
                                ).length
                              }
                              sub="Outside preferred buying route"
                            />
                            <MiniMetric
                              label="Multi-step approvals"
                              value={
                                scopedRequests.filter(
                                  (r) =>
                                    getPolicySignals(r, approvalRules).matchedRule.steps
                                      .length >= 3
                                ).length
                              }
                              sub="Needs additional sign-off"
                            />
                          </div>

                          <div className="mt-6 space-y-3">
                            {exceptionItems.map((item) => (
                              <button
                                key={`${item.request.id}-${item.reasons.join('-')}`}
                                onClick={() => {
                                  setSelectedId(item.request.id)
                                  setPage('requests')
                                }}
                                className="block w-full rounded-[1.35rem] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                              >
                                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                                        {item.request.id}
                                      </div>
                                      <StatusChip
                                        label={item.severity}
                                        tone={
                                          item.severity === 'High'
                                            ? 'rose'
                                            : item.severity === 'Medium'
                                              ? 'amber'
                                              : 'slate'
                                        }
                                      />
                                    </div>
                                    <div className="mt-1 text-sm text-slate-500">
                                      {item.request.venue} • {item.request.supplier} •{' '}
                                      {formatCurrency(item.request.amount)}
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {item.reasons.map((reason) => (
                                        <Badge key={reason} label={reason} tone="slate" />
                                      ))}
                                    </div>
                                  </div>

                                  <div className="text-sm text-slate-500">
                                    {item.request.status}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </Panel>

                        <Panel
                          title="Control recommendations"
                          subtitle="High-level operating actions"
                        >
                          <div className="space-y-3">
                            <RecommendationRow
                              title="Standardise bar supply buying"
                              sub="Riverside and The Oaks are splitting requests across Makro and Booker."
                              value="Savings opportunity"
                            />
                            <RecommendationRow
                              title="Reduce urgent maintenance leakage"
                              sub="Priority maintenance requests are clustering at The Oaks."
                              value="Process opportunity"
                            />
                            <RecommendationRow
                              title="Tighten buyer follow-up"
                              sub="Approved requests are sitting in queue too long in backlog scenarios."
                              value="Execution risk"
                            />
                            <RecommendationRow
                              title="Review escalation thresholds"
                              sub="More requests are now routing into final approver workflows above threshold."
                              value="Approval design"
                            />
                          </div>
                        </Panel>
                      </div>
                    </>
                  )}
                  {page === 'reports' && (
                    <div className="grid gap-6 lg:grid-cols-2">
                      <Panel title="Spend by venue" subtitle="This month">
                        <BarList items={venueSpend} currency />
                      </Panel>

                      <Panel title="Spend by category" subtitle="This month">
                        <BarList items={categorySpend} currency />
                      </Panel>

                      <Panel title="Approval volume" subtitle="Weekly trend">
                        <MiniBars items={approvalVolume} />
                      </Panel>

                      <Panel
                        title="Supplier concentration"
                        subtitle="Where volume is gathering"
                      >
                        <div className="space-y-3">
                          {supplierInsights.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                                    {item.title}
                                  </div>
                                  <div className="text-sm text-slate-500">{item.sub}</div>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                  {item.alert}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Panel>

                      <Panel title="Export reports" subtitle="Excel-compatible CSV">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            Download spend, compliance, and operational control metrics.
                          </div>
                          <button
                            onClick={exportReportsCsv}
                            className="mt-4 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                          >
                            Download Excel Report
                          </button>
                        </div>
                      </Panel>

                      <Panel title="Demo mode" subtitle="Prototype controls and narrative">
                        <div className="grid gap-3">
                          <Insight
                            title="Data scale"
                            value={dataScale}
                            sub="Standard or generated demo dataset"
                          />
                          <Insight
                            title="Keyboard shortcuts"
                            value="A / R / O"
                            sub="Approve, reject, mark ordered"
                          />
                          <Insight
                            title="Command palette"
                            value="⌘K"
                            sub="Quick navigation and actions"
                          />
                        </div>
                      </Panel>
                    </div>
                  )}

                  {page === 'settings' && (
                    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                      <Panel
                        title="Approval routing rules"
                        subtitle="Define whether requests need single, secondary, or third-level approval"
                      >
                        <div className="space-y-4">
                          {approvalRules.map((rule) => (
                            <div
                              key={rule.id}
                              className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                            >
                              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                <div>
                                  <div className="font-semibold text-slate-950 dark:text-slate-100">
                                    {rule.name}
                                  </div>
                                  <div className="mt-1 text-sm text-slate-500">
                                    {rule.venue} • {rule.category} •{' '}
                                    {rule.maxAmount
                                      ? `Up to ${formatCurrency(rule.maxAmount)}`
                                      : 'Escalated / threshold-based'}
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Badge
                                    label={`${rule.steps.length} approval steps`}
                                    tone={
                                      rule.steps.length >= 3 ? 'amber' : 'emerald'
                                    }
                                  />
                                  <Badge
                                    label={
                                      rule.steps.length >= 4
                                        ? 'Third-level route'
                                        : rule.steps.length === 3
                                          ? 'Secondary approval'
                                          : 'Single approval'
                                    }
                                    tone="slate"
                                  />
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center gap-2">
                                {rule.steps.map((step, index) => (
                                  <div
                                    key={`${rule.id}-${step.label}-${index}`}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                      {step.label}
                                      {step.threshold
                                        ? ` ${step.threshold === 500 ? 'over £500' : 'threshold'}`
                                        : ''}
                                    </span>
                                    {index < rule.steps.length - 1 && (
                                      <span className="text-slate-400">→</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Panel>

                      <div className="space-y-6">
                        <Panel
                          title="Add approval rule"
                          subtitle="Example: requester → approver up to £500, then final approver above £500"
                        >
                          <form onSubmit={addApprovalRule} className="space-y-4">
                            <Field label="Rule name">
                              <input
                                value={newRule.name}
                                onChange={(e) =>
                                  setNewRule({ ...newRule, name: e.target.value })
                                }
                                placeholder="High value venue escalation"
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                              />
                            </Field>

                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Venue">
                                <select
                                  value={newRule.venue}
                                  onChange={(e) =>
                                    setNewRule({ ...newRule, venue: e.target.value })
                                  }
                                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                                >
                                  <option>All venues</option>
                                  <option>The Oaks</option>
                                  <option>Riverside</option>
                                  <option>The Pines</option>
                                </select>
                              </Field>

                              <Field label="Category">
                                <select
                                  value={newRule.category}
                                  onChange={(e) =>
                                    setNewRule({
                                      ...newRule,
                                      category: e.target.value,
                                    })
                                  }
                                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                                >
                                  <option>All categories</option>
                                  <option>Maintenance</option>
                                  <option>Bar Supplies</option>
                                  <option>Kitchen</option>
                                  <option>Cleaning</option>
                                </select>
                              </Field>
                            </div>

                            <Field label="Amount band">
                              <select
                                value={newRule.amountBand}
                                onChange={(e) =>
                                  setNewRule({
                                    ...newRule,
                                    amountBand: e.target.value,
                                  })
                                }
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                              >
                                <option>Up to £500</option>
                                <option>Over £500</option>
                                <option>Over £1,000</option>
                              </select>
                            </Field>

                            <div className="grid gap-3">
                              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium shadow-sm dark:border-slate-700">
                                <input
                                  type="checkbox"
                                  checked={newRule.requireFinalApproval}
                                  onChange={(e) =>
                                    setNewRule({
                                      ...newRule,
                                      requireFinalApproval: e.target.checked,
                                    })
                                  }
                                />
                                Add secondary / final approver
                              </label>

                              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium shadow-sm dark:border-slate-700">
                                <input
                                  type="checkbox"
                                  checked={newRule.requireFinance}
                                  onChange={(e) =>
                                    setNewRule({
                                      ...newRule,
                                      requireFinance: e.target.checked,
                                    })
                                  }
                                />
                                Add third-level finance approval
                              </label>
                            </div>

                            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Preview
                              </div>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <Badge label="Requester" tone="slate" />
                                <span className="text-slate-400">→</span>
                                <Badge label="Approver" tone="emerald" />
                                {newRule.requireFinalApproval && (
                                  <>
                                    <span className="text-slate-400">→</span>
                                    <Badge
                                      label={
                                        newRule.amountBand === 'Up to £500'
                                          ? 'Final approver up to £500'
                                          : newRule.amountBand === 'Over £1,000'
                                            ? 'Final approver over £1,000'
                                            : 'Final approver over £500'
                                      }
                                      tone="amber"
                                    />
                                  </>
                                )}
                                {newRule.requireFinance && (
                                  <>
                                    <span className="text-slate-400">→</span>
                                    <Badge label="Finance" tone="rose" />
                                  </>
                                )}
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                            >
                              Save approval rule
                            </button>
                          </form>
                        </Panel>

                        <Panel
                          title="Governance settings"
                          subtitle="Rules, structure, and operating guardrails"
                        >
                          <div className="grid gap-4">
                            <SettingBox
                              title="User roles"
                              items={[
                                'Requester',
                                'Approver',
                                'Final Approver',
                                'Buyer',
                                'Finance',
                                'Admin',
                              ]}
                            />
                            <SettingBox
                              title="Approval logic"
                              items={[
                                'Single-step approval for standard spend',
                                'Secondary approval over configurable thresholds',
                                'Optional third-level finance approval',
                                'Category-specific approval routes',
                              ]}
                            />
                            <SettingBox
                              title="Budget guardrails"
                              items={[
                                'Venue monthly limits',
                                'Category thresholds',
                                'Soft over-budget warnings',
                                'Exception reason capture',
                              ]}
                            />
                            <SettingBox
                              title="Supplier governance"
                              items={[
                                'Preferred suppliers by category',
                                'Price benchmarking',
                                'Duplicate request flags',
                                'Off-path supplier warnings',
                              ]}
                            />
                          </div>
                        </Panel>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {showNewPurchase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Create New Purchase
                  </h2>
                  <div className="mt-1 text-sm text-slate-500">
                    Structured request intake for multi-site teams
                  </div>
                </div>
                <button
                  onClick={() => setShowNewPurchase(false)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200"
                >
                  Close
                </button>
              </div>

              <div className="mb-5 grid gap-3 md:grid-cols-3">
                <ModalInfoCard
                  label="Workflow"
                  value="Requester → Approver → Buyer"
                  sub="Auto-routed by budget, urgency, and category"
                />
                <ModalInfoCard
                  label="Scope"
                  value={workspaceSite}
                  sub="Light theme first enterprise demo"
                />
                <ModalInfoCard
                  label="Control"
                  value="Budget + supplier checks"
                  sub="Immediate policy and routing signals"
                />
              </div>

              <form onSubmit={createPurchase} className="grid gap-4 md:grid-cols-2">
                <Field label="Venue">
                  <select
                    value={newPurchase.venue}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, venue: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option>The Oaks</option>
                    <option>Riverside</option>
                    <option>The Pines</option>
                  </select>
                </Field>

                <Field label="Requester">
                  <input
                    value={newPurchase.requester}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, requester: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                </Field>

                <Field label="Supplier">
                  <input
                    required
                    value={newPurchase.supplier}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, supplier: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                </Field>

                <Field label="Category">
                  <input
                    value={newPurchase.category}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, category: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                </Field>

                <Field label="Amount (£)">
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={newPurchase.amount}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, amount: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                </Field>

                <label className="flex items-center gap-3 self-end rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium shadow-sm dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={newPurchase.priority}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, priority: e.target.checked })
                    }
                  />
                  Mark as priority
                </label>

                <Field label="Description" full>
                  <textarea
                    required
                    value={newPurchase.description}
                    onChange={(e) =>
                      setNewPurchase({
                        ...newPurchase,
                        description: e.target.value,
                      })
                    }
                    className="mt-1 min-h-[90px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                </Field>

                <Field label="Urgent reason" full>
                  <textarea
                    required
                    value={newPurchase.urgentReason}
                    onChange={(e) =>
                      setNewPurchase({
                        ...newPurchase,
                        urgentReason: e.target.value,
                      })
                    }
                    className="mt-1 min-h-[90px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                </Field>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:col-span-2 dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Demo guidance
                  </div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    New requests automatically appear in the request workspace, approval review modal,
                    control metrics, and command palette search.
                  </div>
                </div>

                <div className="flex justify-end gap-3 md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowNewPurchase(false)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Submit Purchase Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showApprovalModal &&
          selected &&
          decision &&
          budgetState &&
          policySignals &&
          supplierSignal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
              <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Approval review
                      </div>
                      <div className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-100">
                        {selected.id}
                      </div>
                      <div className="mt-2 text-sm text-slate-500">
                        {selected.venue} • {selected.supplier} • {selected.category} •{' '}
                        {formatCurrency(selected.amount)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusChip
                        label={selected.priority ? 'Priority' : selected.status}
                        tone={selected.priority ? 'rose' : 'blue'}
                      />
                      <button
                        onClick={closeApprovalModal}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-6">
                    <DecisionBanner decision={decision} />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Insight
                        title="Requester"
                        value={selected.requester}
                        sub={`Submitted ${selected.created}`}
                        compact
                      />
                      <Insight
                        title="Matched approval rule"
                        value={policySignals.matchedRule.name}
                        sub={`${policySignals.matchedRule.steps.length} workflow steps`}
                        compact
                      />
                      <Insight
                        title="Budget impact"
                        value={
                          budgetState.venueAfter < 0 || budgetState.categoryAfter < 0
                            ? 'Exception'
                            : 'Within tolerance'
                        }
                        sub={`Venue remaining after approval: ${formatCurrency(
                          Math.max(budgetState.venueAfter, 0)
                        )}`}
                        compact
                      />
                      <Insight
                        title="Supplier path"
                        value={
                          supplierSignal.isPreferred
                            ? 'Preferred supplier'
                            : 'Review supplier choice'
                        }
                        sub={
                          supplierSignal.isPreferred
                            ? 'Aligned with buying policy'
                            : 'Outside preferred route'
                        }
                        compact
                      />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <SectionLabel title="Description" />
                        <SurfaceText>{selected.description}</SurfaceText>
                      </div>

                      <div>
                        <SectionLabel title="Urgent reason" />
                        <SurfaceText>{selected.urgentReason}</SurfaceText>
                      </div>
                    </div>

                    <SectionLabel title="Approval process" />
                    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                      <div className="flex flex-wrap items-center gap-2">
                        {policySignals.matchedRule.steps.map((step, index) => (
                          <div
                            key={`${step.label}-${index}`}
                            className="flex items-center gap-2"
                          >
                            <Badge
                              label={
                                step.threshold
                                  ? `${step.label} ${
                                      step.threshold === 500
                                        ? 'over £500'
                                        : `threshold ${formatCurrency(step.threshold)}`
                                    }`
                                  : step.label
                              }
                              tone={
                                index === 0
                                  ? 'slate'
                                  : index === policySignals.matchedRule.steps.length - 1
                                    ? 'amber'
                                    : 'emerald'
                              }
                            />
                            {index < policySignals.matchedRule.steps.length - 1 && (
                              <span className="text-slate-400">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <SectionLabel title="Policy routing" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <InfoStack title="Rules triggered" items={policySignals.rules} />
                      <InfoStack title="Approval route" items={policySignals.route} />
                    </div>

                    <SectionLabel title="Budget impact" />
                    <div className="grid gap-3">
                      <BudgetCard
                        label="Venue budget"
                        total={budgetState.venueBudget.total}
                        used={budgetState.venueBudget.used}
                        request={selected.amount}
                        status={budgetState.venueStatus}
                      />
                      <BudgetCard
                        label="Category budget"
                        total={budgetState.categoryBudget.total}
                        used={budgetState.categoryBudget.used}
                        request={selected.amount}
                        status={budgetState.categoryStatus}
                      />
                    </div>

                    <SectionLabel title="Supplier guidance" />
                    <div className="grid gap-3 md:grid-cols-3">
                      <Insight
                        title="Price signal"
                        value={supplierSignal.priceSignal}
                        sub={`Last comparable ${formatCurrency(
                          supplierSignal.lastPrice
                        )} • ${supplierSignal.deltaPct >= 0 ? '+' : ''}${supplierSignal.deltaPct}%`}
                        compact
                      />
                      <Insight
                        title="Preferred route"
                        value={
                          supplierSignal.preferred.length
                            ? supplierSignal.preferred.join(', ')
                            : 'No preferred supplier set'
                        }
                        sub="Configured options for this category"
                        compact
                      />
                      <Insight
                        title="Duplicate check"
                        value={supplierSignal.duplicateRisk}
                        sub="Similarity check across recent requests"
                        compact
                      />
                    </div>

                    <SectionLabel title="Track record" />
                    <div className="grid gap-3 md:grid-cols-3">
                      <Insight
                        title="Same venue/category"
                        value="£1,240"
                        sub="Across 6 recent approved requests"
                        compact
                      />
                      <Insight
                        title="Last supplier price"
                        value={formatCurrency(supplierSignal.lastPrice)}
                        sub="04/03/2026 at comparable site"
                        compact
                      />
                      <Insight
                        title="Average spend"
                        value="£151"
                        sub="Typical order size for this category"
                        compact
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Panel title="Decision controls" subtitle="Approve or reject from one focused workflow">
                      <div className="space-y-4">
                        <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Approval summary
                          </div>
                          <div className="mt-3 grid gap-2">
                            <SignalRow label="Request amount" value={formatCurrency(selected.amount)} />
                            <SignalRow
                              label="Approval steps"
                              value={policySignals.matchedRule.steps.length}
                            />
                            <SignalRow
                              label="Budget state"
                              value={
                                budgetState.venueStatus === 'Healthy' &&
                                budgetState.categoryStatus === 'Healthy'
                                  ? 'Healthy'
                                  : 'Review'
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            Approval note
                          </label>
                          <textarea
                            value={approvalNote}
                            onChange={(e) => setApprovalNote(e.target.value)}
                            placeholder="Add decision context, caveats, or operational notes..."
                            className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            Rejection reason
                          </label>
                          <select
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                          >
                            <option>Over budget</option>
                            <option>Use approved supplier</option>
                            <option>Duplicate request</option>
                            <option>Insufficient detail</option>
                            <option>Not urgent enough</option>
                          </select>
                        </div>

                        <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Timeline
                          </div>
                          <div className="mt-3 space-y-3">
                            <TimelineItem
                              title="Request submitted"
                              meta={`${selected.requester} • ${selected.created}`}
                            />
                            <TimelineItem
                              title="Approval review"
                              meta={`Matched to ${policySignals.matchedRule.name}`}
                            />
                            <TimelineItem
                              title="Buyer handoff"
                              meta="Moves to buyer queue after final approval"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => reject(selected.id)}
                            className="flex-1 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-50 dark:border-rose-900/50 dark:bg-slate-900 dark:text-rose-300"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => approve(selected.id)}
                            className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </Panel>
                  </div>
                </div>
              </div>
            </div>
          )}

        {showCommandPalette && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/35 p-6 backdrop-blur-sm">
            <div className="mt-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <input
                    autoFocus
                    value={commandQuery}
                    onChange={(e) => setCommandQuery(e.target.value)}
                    placeholder="Search pages, actions, requests, or scenarios…"
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="max-h-[70vh] overflow-auto p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Command results
                  </div>
                  <div className="text-xs text-slate-500">⌘K to open • Esc to close</div>
                </div>

                <div className="space-y-2">
                  {filteredCommandItems.map((item) => (
                    <button
                      key={`${item.group}-${item.label}`}
                      onClick={() => {
                        item.fn()
                        setShowCommandPalette(false)
                        setCommandQuery('')
                      }}
                      className="flex w-full items-center justify-between rounded-[1.25rem] border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{item.group}</div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        Run
                      </span>
                    </button>
                  ))}

                  {filteredCommandItems.length === 0 && (
                    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                      No commands match your search.
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                <button
                  onClick={() => {
                    setShowCommandPalette(false)
                    setCommandQuery('')
                  }}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PremiumMetricCard({
  title,
  value,
  delta,
  deltaTone,
  sub,
  insight,
}: {
  title: string
  value: string | number
  delta: string
  deltaTone: 'rose' | 'amber' | 'emerald' | 'slate'
  sub: string
  insight: string
}) {
  const deltaClass =
    deltaTone === 'rose'
      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
      : deltaTone === 'amber'
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
        : deltaTone === 'emerald'
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', deltaClass)}>
          {delta}
        </span>
      </div>

      <div className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{sub}</div>

      <div className="mt-4 space-y-2">
        <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-1.5 w-2/3 rounded-full bg-slate-950 dark:bg-slate-100" />
        </div>
        <div className="text-xs text-slate-500">{insight}</div>
      </div>
    </div>
  )
}

function Panel({
  title,
  subtitle,
  children,
  sticky = false,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  sticky?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        sticky && 'xl:sticky xl:top-8'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-100">
            {title}
          </h2>
          {subtitle && (
            <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
          )}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2 text-sm dark:border-slate-800">
      <div className="text-slate-500">{label}</div>
      <div className="text-right font-medium text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  )
}

function Insight({
  title,
  value,
  sub,
  compact = false,
}: {
  title: string
  value: string | number
  sub: string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[1.25rem] p-4',
        compact
          ? 'border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
          : 'border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900'
      )}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </div>
      <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-500">{sub}</div>
    </div>
  )
}

function DecisionBanner({
  decision,
}: {
  decision: {
    tone: 'approve' | 'caution' | 'review'
    title: string
    reasons: string[]
  }
}) {
  const toneClass =
    decision.tone === 'approve'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-100'
      : decision.tone === 'caution'
        ? 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100'
        : 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-100'

  return (
    <div className={cn('rounded-[1.35rem] border p-4', toneClass)}>
      <div className="text-sm font-bold">{decision.title}</div>
      <div className="mt-2 grid gap-2">
        {decision.reasons.map((reason) => (
          <div key={reason} className="text-sm">
            • {reason}
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-slate-100" />
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </div>
        <div className="text-xs text-slate-500">{meta}</div>
      </div>
    </div>
  )
}

function BarList({
  items,
  currency = false,
}: {
  items: { name: string; value: number }[]
  currency?: boolean
}) {
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.name}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {currency ? `£${item.value.toLocaleString()}` : item.value}
            </span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-3 rounded-full bg-slate-900 dark:bg-slate-100"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function MiniBars({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <div className="flex h-48 items-end gap-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {item.value}
          </div>
          <div
            className="w-full rounded-t-2xl bg-slate-900 dark:bg-slate-100"
            style={{ height: `${(item.value / max) * 140 + 20}px` }}
          />
          <div className="text-xs text-slate-500">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function SettingBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <div key={item} className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <label
      className={`${full ? 'md:col-span-2' : ''} text-sm font-medium text-slate-900 dark:text-slate-100`}
    >
      {label}
      {children}
    </label>
  )
}

function StatusChip({
  label,
  tone,
}: {
  label: string
  tone: 'rose' | 'blue' | 'amber' | 'emerald' | 'slate'
}) {
  const styles: Record<typeof tone, string> = {
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    emerald:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    slate:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  }

  return (
    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', styles[tone])}>
      {label}
    </span>
  )
}

function Badge({
  label,
  tone,
}: {
  label: string
  tone: 'rose' | 'amber' | 'emerald' | 'slate'
}) {
  const styles: Record<typeof tone, string> = {
    rose: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/20 dark:text-rose-300 dark:ring-rose-900/50',
    amber:
      'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:ring-amber-900/50',
    emerald:
      'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:ring-emerald-900/50',
    slate:
      'bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
  }

  return (
    <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium ring-1', styles[tone])}>
      {label}
    </span>
  )
}

function KpiTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string | number
  tone: 'neutral' | 'rose' | 'amber' | 'slate'
}) {
  const toneClass =
    tone === 'rose'
      ? 'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/40'
      : tone === 'amber'
        ? 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/40'
        : tone === 'slate'
          ? 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
          : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700'

  return (
    <div className={cn('rounded-[1.25rem] border p-4 shadow-sm', toneClass)}>
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  )
}

function VenueScorecard({
  venue,
  spend,
  riskScore,
  compliance,
  urgentRate,
  onOpen,
}: {
  venue: string
  spend: number
  riskScore: number
  compliance: number
  urgentRate: number
  onOpen: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">
            {venue}
          </div>
          <div className="mt-1 text-sm text-slate-500">
            {formatCurrency(spend)} this month
          </div>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700">
          Risk {riskScore}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Compliance
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            {compliance}%
          </div>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-900">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Urgent rate
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            {urgentRate}%
          </div>
        </div>
      </div>
    </button>
  )
}

function PriorityActionCard({
  title,
  value,
  sub,
  action,
  onClick,
  tone,
}: {
  title: string
  value: string
  sub: string
  action: string
  onClick: () => void
  tone: 'rose' | 'amber' | 'slate'
}) {
  const toneClass =
    tone === 'rose'
      ? 'border-rose-100 bg-rose-50 dark:border-rose-900/40 dark:bg-rose-950/20'
      : tone === 'amber'
        ? 'border-amber-100 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20'
        : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'

  return (
    <div className={cn('rounded-[1.35rem] border p-4 shadow-sm', toneClass)}>
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </div>
      <div className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{sub}</div>
      <button
        onClick={onClick}
        className="mt-4 rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
      >
        {action}
      </button>
    </div>
  )
}

function MiniMetric({
  label,
  value,
  sub,
}: {
  label: string
  value: string | number
  sub: string
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-500">{sub}</div>
    </div>
  )
}

function RecommendationRow({
  title,
  sub,
  value,
}: {
  title: string
  sub: string
  value: string
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </div>
          <div className="mt-1 text-sm text-slate-500">{sub}</div>
        </div>
        <Badge label={value} tone="slate" />
      </div>
    </div>
  )
}

function TopPill({
  text,
  emphasized = false,
}: {
  text: string
  emphasized?: boolean
}) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1.5 text-[11px] font-semibold',
        emphasized
          ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-900'
          : 'bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
      )}
    >
      {text}
    </span>
  )
}

function ControlSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none dark:text-slate-100"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

function QuickFilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1.5 text-xs font-semibold transition',
        active
          ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-900'
          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800'
      )}
    >
      {label}
    </button>
  )
}

function SignalRow({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-950 dark:text-slate-100">{value}</span>
    </div>
  )
}

function ModalInfoCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-950 dark:text-slate-100">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  )
}
function SectionLabel({ title }: { title: string }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
      {title}
    </div>
  )
}

function SurfaceText({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {children}
    </div>
  )
}

function InfoStack({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function BudgetCard({
  label,
  total,
  used,
  request,
  status,
}: {
  label: string
  total: number
  used: number
  request: number
  status: string
}) {
  const after = total - used - request
  const pct = Math.min(((used + request) / Math.max(total, 1)) * 100, 100)

  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {label}
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Total {formatCurrency(total)} • Used {formatCurrency(used)} • Request{' '}
            {formatCurrency(request)}
          </div>
        </div>
        <StatusChip
          label={status}
          tone={
            status === 'Over budget'
              ? 'rose'
              : status === 'At risk'
                ? 'amber'
                : 'emerald'
          }
        />
      </div>

      <div className="mt-4 h-3 rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-3 rounded-full bg-slate-900 dark:bg-slate-100"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-3 text-sm text-slate-500">
        Remaining after approval:{' '}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {formatCurrency(Math.max(after, 0))}
        </span>
      </div>
    </div>
  )
}
function ForceLightTheme() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark')
    document.body.style.background = '#f8fafc'
  }

  return (
    <style jsx global>{`
      body {
        background: #f8fafc !important;
        color: #0f172a !important;
      }

      .dark {
        color-scheme: light !important;
      }

      .dark * {
        background-color: inherit !important;
        color: inherit !important;
        border-color: #e2e8f0 !important;
      }
    `}</style>
  )
}
function ForceWhiteTheme() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark')
    document.body.style.background = '#f8fafc'
    document.body.style.color = '#0f172a'
  }

  return (
    <style jsx global>{`
      html,
      body {
        background: #f8fafc !important;
        color: #0f172a !important;
      }

      .dark {
        color-scheme: light !important;
      }

      .dark * {
        color-scheme: light !important;
      }

      [class*='bg-slate-950'],
      [class*='bg-slate-900'],
      [class*='bg-slate-800'],
      [class*='bg-slate-700'],
      [class*='bg-slate-600'],
      [class*='bg-slate-500'] {
        background-color: #ffffff !important;
      }

      [class*='bg-slate-100'],
      [class*='bg-slate-50'] {
        background-color: #ffffff !important;
      }

      [class*='text-slate-100'],
      [class*='text-slate-200'],
      [class*='text-slate-300'],
      [class*='text-slate-400'],
      [class*='text-slate-500'],
      [class*='text-slate-600'],
      [class*='text-slate-700'],
      [class*='text-slate-800'],
      [class*='text-slate-900'],
      [class*='text-slate-950'] {
        color: #0f172a !important;
      }

      [class*='border-slate-900'],
      [class*='border-slate-800'],
      [class*='border-slate-700'],
      [class*='border-slate-600'],
      [class*='border-slate-500'],
      [class*='border-slate-400'],
      [class*='border-slate-300'],
      [class*='border-slate-200'],
      [class*='border-slate-100'] {
        border-color: #e2e8f0 !important;
      }

      [class*='shadow-sm'] {
        box-shadow:
          0 1px 2px rgba(15, 23, 42, 0.04),
          0 8px 24px rgba(15, 23, 42, 0.04) !important;
      }

      [class*='shadow-md'],
      [class*='shadow-lg'],
      [class*='shadow-xl'],
      [class*='shadow-2xl'] {
        box-shadow:
          0 1px 2px rgba(15, 23, 42, 0.05),
          0 12px 32px rgba(15, 23, 42, 0.08) !important;
      }

      [class*='rounded-[2rem]'],
      [class*='rounded-[1.75rem]'],
      [class*='rounded-[1.5rem]'],
      [class*='rounded-[1.35rem]'],
      [class*='rounded-[1.25rem]'] {
        overflow: hidden;
      }

      [class*='dark:bg-'],
      [class*='dark:text-'],
      [class*='dark:border-'] {
        background-color: inherit !important;
        color: inherit !important;
        border-color: #e2e8f0 !important;
      }

      button {
        transition:
          background-color 140ms ease,
          border-color 140ms ease,
          box-shadow 140ms ease,
          transform 140ms ease !important;
      }

      button:hover {
        box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
      }

      input,
      select,
      textarea {
        background: #ffffff !important;
        color: #0f172a !important;
        border-color: #dbe3ee !important;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03) !important;
      }

      input::placeholder,
      textarea::placeholder {
        color: #94a3b8 !important;
      }

      table thead tr {
        background: #f8fafc !important;
      }

      table tbody tr:hover {
        background: #f8fafc !important;
      }
    `}</style>
  )
}
