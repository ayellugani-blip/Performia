import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Filter,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import type { TimelineInsightItem, PriorityLevel, InsightStatus, AiInsight } from '../../types/insights';

interface InsightsTimelineProps {
  items: TimelineInsightItem[];
  allInsights: AiInsight[];
  onSelectInsight: (insight: AiInsight) => void;
}

export const InsightsTimeline: React.FC<InsightsTimelineProps> = ({
  items,
  allInsights,
  onSelectInsight,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredItems = items.filter((item) => {
    if (selectedStatus === 'All') return true;
    return item.status === selectedStatus;
  });

  const renderPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return <span className="badge-high">High</span>;
      case 'Medium':
        return <span className="badge-medium">Medium</span>;
      case 'Low':
        return <span className="badge-low">Low</span>;
      default:
        return null;
    }
  };

  const renderStatusBadge = (status: InsightStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#0078D4] border border-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0078D4]" />
            Active
          </span>
        );
      case 'In Review':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-100">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            In Review
          </span>
        );
      case 'Actioned':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            Actioned
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-200">
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const handleRowClick = (refId: string) => {
    const found = allInsights.find((i) => i.id === refId) || allInsights[0];
    if (found) {
      onSelectInsight(found);
    }
  };

  return (
    <div className="card-elevated overflow-hidden bg-white">
      {/* Header & Filter Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-[#0078D4]" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Recent AI Insights
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {filteredItems.length} records
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Historical timeline of generated workforce intelligence signals and resolution states.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All States</option>
              <option value="Active">Active</option>
              <option value="In Review">In Review</option>
              <option value="Actioned">Actioned</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Date
              </th>
              <th scope="col" className="px-5 py-3.5">
                Insight
              </th>
              <th scope="col" className="px-5 py-3.5">
                Employees Affected
              </th>
              <th scope="col" className="px-5 py-3.5">
                Priority
              </th>
              <th scope="col" className="px-5 py-3.5">
                Status
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal">
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(item.rawInsightRefId)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                {/* Date */}
                <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.date}</span>
                  </div>
                </td>

                {/* Insight & Department */}
                <td className="px-5 py-3.5 max-w-md">
                  <div className="font-semibold text-slate-900 group-hover:text-[#0078D4] transition-colors leading-tight">
                    {item.insightTitle}
                  </div>
                  <span className="mt-1 inline-block text-[10px] font-semibold text-slate-500">
                    Dept: {item.department}
                  </span>
                </td>

                {/* Employees Affected */}
                <td className="whitespace-nowrap px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                      {item.affectedCount}
                    </div>
                    <span className="font-medium text-slate-700">
                      {item.affectedCount} employees
                    </span>
                  </div>
                </td>

                {/* Priority */}
                <td className="whitespace-nowrap px-5 py-3.5">
                  {renderPriorityBadge(item.priority)}
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-5 py-3.5">
                  {renderStatusBadge(item.status)}
                </td>

                {/* View Action */}
                <td className="whitespace-nowrap px-5 py-3.5 text-right">
                  <span className="inline-flex items-center gap-0.5 font-semibold text-[#0078D4] group-hover:underline">
                    View
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredItems.length} of {items.length} AI workforce timeline events</span>
        <span className="text-[11px] text-slate-400">Chronological telemetry order</span>
      </div>
    </div>
  );
};
