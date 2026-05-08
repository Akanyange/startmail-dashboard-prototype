'use client';

import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Upload,
  FileText,
  MoreHorizontal,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  Pencil,
  CheckCircle2,
  User,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = 'idle' | 'loading' | 'generated';

interface ConceptCard {
  id: string;
  group: string;
  title: string;
  version?: number;
  points: string[];
  hasNoCriteria?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const IDLE_CONCEPTS: ConceptCard[] = [
  {
    id: 'c1',
    group: 'all',
    title: 'Vertriebs und Marketingkonzept',
    points: [
      'Gewichtung: 40 Punkte',
      'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
      'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
    ],
  },
  {
    id: 'c2',
    group: 'all',
    title: 'Vertriebs und Marketingkonzept',
    points: [
      'Gewichtung: 40 Punkte',
      'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
      'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
    ],
  },
  {
    id: 'c3',
    group: 'all',
    title: 'Leistungserbringungs-betriebs und Servicekonzept',
    points: [
      'Gewichtung: 40 Punkte',
      'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
      'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
    ],
  },
  {
    id: 'c4',
    group: 'all',
    title: 'Aubaukonzept',
    hasNoCriteria: true,
    points: [],
  },
  {
    id: 'c5',
    group: 'all',
    title: 'Vertriebs und Marketingkonzept',
    points: [
      'Gewichtung: 40 Punkte',
      'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
      'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
    ],
  },
  {
    id: 'c6',
    group: 'all',
    title: 'Vertriebs und Marketingkonzept',
    points: [
      'Gewichtung: 40 Punkte',
      'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
      'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
    ],
  },
];

const VERSION_PILLS = [
  'Version 1: 1 day ago',
  'Version 2: 1 hr ago',
  'Version 3: 10 min ago',
];

// All possible versions per concept group — slice to retryCount when rendering
const CONCEPT_GROUPS = [
  {
    id: 'vertriebs',
    name: 'Vertriebs Und MarketingKonzept',
    versions: [
      {
        id: 'v-vm-1',
        version: 1,
        title: 'Vertriebs und Marketingkonzept',
        points: [
          'Gewichtung: 40 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
      {
        id: 'v-vm-2',
        version: 2,
        title: 'Vertriebs und Marketingkonzept',
        points: [
          'Gewichtung: 40 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
      {
        id: 'v-vm-3',
        version: 3,
        title: 'Vertriebs und Marketingkonzept',
        points: [
          'Gewichtung: 40 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
    ],
  },
  {
    id: 'service',
    name: 'Servicekonzept',
    versions: [
      {
        id: 'v-sk-1',
        version: 1,
        title: 'Servicekonzept',
        points: [
          'Gewichtung: 30 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
      {
        id: 'v-sk-2',
        version: 2,
        title: 'Servicekonzept',
        points: [
          'Gewichtung: 30 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
      {
        id: 'v-sk-3',
        version: 3,
        title: 'Servicekonzept',
        points: [
          'Gewichtung: 30 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
    ],
  },
  {
    id: 'leistung',
    name: 'Leistungserbringungskonzept',
    versions: [
      {
        id: 'v-lk-1',
        version: 1,
        title: 'Leistungserbringungskonzept',
        points: [
          'Gewichtung: 20 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
      {
        id: 'v-lk-2',
        version: 2,
        title: 'Leistungserbringungskonzept',
        points: [
          'Gewichtung: 20 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
      {
        id: 'v-lk-3',
        version: 3,
        title: 'Leistungserbringungskonzept',
        points: [
          'Gewichtung: 20 Punkte',
          'Qualität der Backboneanbindung: Redundanz und bedarfsgerechte Dimensionierung',
          'Zeitliche Verfügbarkeit einer symmetrischen Mindestübertragungsrate von 1000 M...',
        ],
      },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConceptCardIdle({
  card,
  checked,
  onCheck,
}: {
  card: ConceptCard;
  checked: boolean;
  onCheck: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-colors',
        checked ? 'border-[#E20074]' : 'border-gray-200'
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onCheck(card.id)}
            className="mt-0.5 h-4 w-4 cursor-pointer accent-[#E20074]"
          />
          <span className="text-sm font-medium text-gray-900">{card.title}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </Button>
      </div>

      {card.hasNoCriteria ? (
        <p className="mb-6 ml-6 text-xs text-gray-400">No value criteria found</p>
      ) : (
        <ul className="mb-2 ml-6 space-y-0.5">
          {card.points.map((p, i) => (
            <li key={i} className={cn('text-xs', i === 0 ? 'text-[#E20074]' : 'text-gray-600')}>
              · {p}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between">
        {!card.hasNoCriteria && (
          <button className="ml-6 text-xs text-[#E20074] hover:underline">Read more....</button>
        )}
        <div className="ml-auto">
          {card.hasNoCriteria ? (
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
              <Pencil className="h-3.5 w-3.5 text-gray-400" />
            </button>
          ) : (
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
              <Plus className="h-3.5 w-3.5 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConceptVersionCard({
  version,
  groupId,
  selectedVersions,
  onSelect,
}: {
  version: (typeof CONCEPT_GROUPS)[0]['versions'][0];
  groupId: string;
  selectedVersions: Record<string, string>;
  onSelect: (groupId: string, versionId: string) => void;
}) {
  const isSelected = selectedVersions[groupId] === version.id;

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-col rounded-lg border bg-white p-4 shadow-sm transition-colors',
        isSelected ? 'border-[#E20074]' : 'border-gray-200 hover:border-gray-300'
      )}
      onClick={() => onSelect(groupId, version.id)}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <RadioGroupItem
            value={version.id}
            id={version.id}
            className="mt-0.5 shrink-0"
          />
          <span className="text-sm font-medium text-gray-900">{version.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Version {version.version}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>

      <ul className="mb-2 ml-6 space-y-0.5">
        {version.points.map((p, i) => (
          <li key={i} className={cn('text-xs', i === 0 ? 'text-[#E20074]' : 'text-gray-600')}>
            · {p}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between">
        <button
          className="ml-6 text-xs text-[#E20074] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Read more....
        </button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

// ─── Spinning loader icon ─────────────────────────────────────────────────────

function SpinningOrb() {
  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      {/* Outer blurred ring — spins */}
      <div
        className="absolute inset-0 animate-spin rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 20%, #E20074 60%, transparent 80%)',
          filter: 'blur(10px)',
          animationDuration: '1.4s',
        }}
      />
      {/* Second blurred ring offset — counter-spins for depth */}
      <div
        className="absolute inset-2 animate-spin rounded-full"
        style={{
          background:
            'conic-gradient(from 180deg, transparent 30%, #ff69b4 55%, transparent 75%)',
          filter: 'blur(8px)',
          animationDuration: '2s',
          animationDirection: 'reverse',
        }}
      />
      {/* White centre */}
      <div className="relative z-10 h-14 w-14 rounded-full bg-white shadow-sm" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ConceptPage() {
  const [screen, setScreen] = useState<Screen>('idle');
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [allChecked, setAllChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;
  const retriesLeft = MAX_RETRIES - retryCount;

  // Auto-transition loading → generated after 5 s
  useEffect(() => {
    if (screen !== 'loading') return;
    const t = setTimeout(() => {
      setScreen('generated');
      setShowSuccess(true);
    }, 5000);
    return () => clearTimeout(t);
  }, [screen]);

  // Dismiss success banner after 4 s
  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => setShowSuccess(false), 4000);
    return () => clearTimeout(t);
  }, [showSuccess]);

  function toggleCard(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allChecked) {
      setCheckedIds(new Set());
      setAllChecked(false);
    } else {
      setCheckedIds(new Set(IDLE_CONCEPTS.map((c) => c.id)));
      setAllChecked(true);
    }
  }

  function handleRetry() {
    if (retryCount >= MAX_RETRIES) return;
    setRetryCount((n) => n + 1);
    setScreen('loading');
  }

  function selectVersion(groupId: string, versionId: string) {
    setSelectedVersions((prev) => ({ ...prev, [groupId]: versionId }));
  }

  const selectedCount = Object.keys(selectedVersions).length;
  const totalGroups = CONCEPT_GROUPS.length;

  // ── Loading screen ──────────────────────────────────────────────────────────
  if (screen === 'loading') {
    return (
      <div className="-mx-6 -mt-5">
        {/* Breadcrumb + title */}
        <div className="px-6 pt-5 pb-4">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
            <span>Home</span>
            <span>·</span>
            <span className="font-medium text-gray-800">Generate Concepts</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Generating Concept Documents</h1>
        </div>

        {/* Files + Consulter row */}
        <FilesConsulterRow />

        {/* Main panel */}
        <div className="mx-6 mt-4 flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Left sidebar */}
          <SidebarPanel open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} count={8} generated={false} />

          {/* Content area */}
          <div className="flex flex-1 flex-col">
            {/* Header bar (no sticky needed on loading) */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <input type="checkbox" disabled className="h-4 w-4 accent-[#E20074] opacity-40" />
                <span className="text-sm font-medium text-gray-700">All Concepts</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 opacity-40">
                  <RotateCcw className="h-4 w-4 text-gray-500" />
                </button>
                <Button variant="outline" size="sm" className="gap-1.5 opacity-40" disabled>
                  <Upload className="h-3.5 w-3.5" />
                  Upload concept
                </Button>
              </div>
            </div>

            {/* Spinner centre */}
            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-24">
              <SpinningOrb />
              <p className="text-sm text-gray-600">Re-generating Concepts</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Generated screen ────────────────────────────────────────────────────────
  if (screen === 'generated') {
    return (
      <div className="-mx-6 -mt-5">
        {/* Breadcrumb + title */}
        <div className="px-6 pt-5 pb-4">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
            <span>Home</span>
            <span>·</span>
            <span className="font-medium text-gray-800">Generate Concepts</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Generate Concept Document</h1>
        </div>

        {/* Files + Consulter row */}
        <FilesConsulterRow />

        {/* Success toast */}
        {showSuccess && (
          <div className="mx-6 mt-3 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 shadow-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
            <span>
              Concepts re-generated successfully! You have{' '}
              <strong>{retriesLeft} {retriesLeft === 1 ? 'retry' : 'retries'} remaining</strong> and{' '}
              <strong>{retryCount + 1} {retryCount + 1 === 1 ? 'version' : 'versions'}</strong> to choose from.
            </span>
          </div>
        )}

        {/* Main panel */}
        <div
          className="mx-6 mt-4 flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          style={{ height: 'calc(100vh - 280px)', minHeight: 480 }}
        >
          {/* Left sidebar */}
          <SidebarPanel
            open={sidebarOpen}
            onToggle={() => setSidebarOpen((v) => !v)}
            count={6}
            generated
            generatedCount={6}
            unselectedCount={totalGroups - selectedCount}
          />

          {/* Content — flex column so header/footer stick */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* ── Sticky top header ── */}
            <div className="shrink-0 border-b border-gray-100 px-5 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Generated Concepts</p>
                  <p className="text-xs text-gray-500">
                    All versions are grouped by concept name. Pick one per group to start generating
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={handleRetry}
                    disabled={retriesLeft === 0}
                    title={retriesLeft === 0 ? 'No retries remaining' : `Retry (${retriesLeft} remaining)`}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full border border-gray-200',
                      retriesLeft === 0
                        ? 'cursor-not-allowed opacity-40'
                        : 'hover:bg-gray-50'
                    )}
                  >
                    <RotateCcw className="h-4 w-4 text-gray-500" />
                  </button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    Upload concept
                  </Button>
                </div>
              </div>

              {/* Version pills — one per retry */}
              <div className="mt-3 flex items-center gap-2">
                {VERSION_PILLS.slice(0, retryCount + 1).map((label) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Scrollable concepts ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {CONCEPT_GROUPS.map((group) => {
                const visibleVersions = group.versions.slice(0, retryCount + 1);
                const selectedVersion = visibleVersions.find(v => v.id === selectedVersions[group.id]);
                return (
                  <div key={group.id}>
                    <div className="mb-1 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{group.name}</p>
                        <p className="text-xs text-gray-500">
                          {visibleVersions.length} {visibleVersions.length === 1 ? 'Version' : 'Versions'} available. Review and choose one
                        </p>
                      </div>
                      {selectedVersion && (
                        <span className="flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-[#E20074]">
                          <CheckCircle2 className="h-3 w-3" />
                          Version {selectedVersion.version} selected
                        </span>
                      )}
                    </div>

                    <RadioGroup
                      value={selectedVersions[group.id] ?? ''}
                      onValueChange={(val) => selectVersion(group.id, val)}
                      className="grid grid-cols-2 gap-3"
                    >
                      {visibleVersions.map((v) => (
                        <ConceptVersionCard
                          key={v.id}
                          version={v}
                          groupId={group.id}
                          selectedVersions={selectedVersions}
                          onSelect={selectVersion}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                );
              })}
            </div>

            {/* ── Sticky bottom footer ── */}
            <div className="shrink-0 flex items-center justify-between border-t border-gray-100 px-5 py-3">
              <span className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
                {selectedCount} of {totalGroups} Concepts selected
              </span>
              <div className="flex items-center gap-3">
                <button className="text-sm text-gray-600 hover:text-gray-900">Cancel</button>
                <Button
                  size="sm"
                  className={cn(
                    'px-5',
                    selectedCount === 0 && 'opacity-50 cursor-not-allowed'
                  )}
                  disabled={selectedCount === 0}
                >
                  Start Generating
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Idle screen (default) ───────────────────────────────────────────────────
  return (
    <div className="-mx-6 -mt-5">
      {/* Breadcrumb + title */}
      <div className="px-6 pt-5 pb-4">
        <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
          <span>Home</span>
          <span>·</span>
          <span className="font-medium text-gray-800">Generate Concepts</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Concept Document</h1>
      </div>

      {/* Files + Consulter row */}
      <FilesConsulterRow />

      {/* Main panel */}
      <div
        className="mx-6 mt-4 flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        style={{ height: 'calc(100vh - 260px)', minHeight: 480 }}
      >
        {/* Left sidebar */}
        <SidebarPanel
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          count={8}
          generated={false}
        />

        {/* Content — flex column so header/footer stick */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* ── Sticky top header ── */}
          <div className="shrink-0 flex items-center justify-between border-b border-gray-100 px-5 py-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="h-4 w-4 cursor-pointer accent-[#E20074]"
              />
              <span className="text-sm font-medium text-gray-700">All Concepts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button
                  onClick={handleRetry}
                  disabled={retriesLeft === 0}
                  title={retriesLeft === 0 ? 'No retries remaining' : `Retry (${retriesLeft} remaining)`}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border border-gray-200',
                    retriesLeft === 0
                      ? 'cursor-not-allowed opacity-40'
                      : 'hover:bg-gray-50'
                  )}
                >
                  <RotateCcw className="h-4 w-4 text-gray-500" />
                </button>
                {/* Tooltip */}
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {retriesLeft === 0 ? 'No retries left' : `Retry (${retriesLeft} left)`}
                </span>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                Upload concept
              </Button>
            </div>
          </div>

          {/* ── Scrollable concepts grid ── */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="grid grid-cols-2 gap-3">
              {IDLE_CONCEPTS.map((card) => (
                <ConceptCardIdle
                  key={card.id}
                  card={card}
                  checked={checkedIds.has(card.id)}
                  onCheck={toggleCard}
                />
              ))}
            </div>
          </div>

          {/* ── Sticky bottom footer ── */}
          <div className="shrink-0 flex items-center justify-between border-t border-gray-100 px-5 py-3">
            <button className="text-sm text-gray-600 hover:text-gray-900">Cancel</button>
            <Button size="sm" className="px-6" disabled={checkedIds.size === 0}>
              Start Generating
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function FilesConsulterRow() {
  return (
    <div className="flex items-start justify-between px-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-800">Available files</p>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">Bekanntmachung</span>
          <Button variant="outline" size="sm" className="ml-2 h-6 px-2 text-xs">
            <Eye className="mr-1 h-3 w-3" />
            Preview
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-gray-800">Consulter</p>
        <div className="flex items-center gap-2 rounded-xl border-2 border-[#E20074] bg-white px-3 py-2 shadow-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
            <User className="h-3.5 w-3.5 text-gray-500" />
          </div>
          <span className="text-sm font-medium text-[#E20074]">F. Niedermaier</span>
          <span className="rounded-full bg-[#E20074] px-2 py-0.5 text-[10px] font-semibold text-white">
            Coverse
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function SidebarPanel({
  open,
  onToggle,
  count,
  generated,
  generatedCount,
  unselectedCount,
}: {
  open: boolean;
  onToggle: () => void;
  count: number;
  generated: boolean;
  generatedCount?: number;
  unselectedCount?: number;
}) {
  return (
    <div
      className={cn(
        'shrink-0 border-r border-gray-100 bg-white transition-all duration-200',
        open ? 'w-52' : 'w-12'
      )}
    >
      {open && (
        <div className="p-3">
          {/* All row */}
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E20074]" />
              <FileText className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-700">All</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">{count}</span>
              <ChevronUp className="h-3.5 w-3.5 text-gray-400" />
            </div>
          </button>

          {generated && (
            <div className="mt-1 space-y-0.5 pl-2">
              <div className="flex items-center justify-between rounded-md px-2 py-1.5 bg-pink-50">
                <span className="text-xs font-medium text-[#E20074]">Generated Concepts</span>
                <span className="text-xs font-semibold text-[#E20074]">{generatedCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-md px-2 py-1.5">
                <span className="text-xs text-gray-500">Unselected Concepts</span>
                <span className="text-xs text-gray-500">{unselectedCount ?? 0}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {!open && (
        <button
          onClick={onToggle}
          className="flex h-10 w-full items-center justify-center hover:bg-gray-50"
        >
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}
