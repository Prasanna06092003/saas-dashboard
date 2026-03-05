import { useState } from "react";
import { campaigns as initialCampaigns } from "../data/campaigns";
import { Link } from "react-router-dom";

export default function Campaigns() {
  const [campaignData, setCampaignData] = useState(initialCampaigns);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);

  const itemsPerPage = 2;

  // Filter
  const filteredCampaigns = campaignData.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sorting
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    return sortAsc ? a.budget - b.budget : b.budget - a.budget;
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentCampaigns = sortedCampaigns.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);
  const updateCampaignStatus = (id: number) => {
    const previousData = [...campaignData];

    // Optimistic UI update
    const updated = campaignData.map((campaign) => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: campaign.status === "Active" ? "Paused" : "Active",
        };
      }

      return campaign;
    });

    setCampaignData(updated);

    // Simulate API delay
    setTimeout(() => {
      const failed = Math.random() < 0.2; // 20% chance of failure

      if (failed) {
        alert("Update failed. Reverting changes.");

        setCampaignData(previousData);
      }
    }, 1200);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Campaign Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search campaigns..."
        className="border p-2 mb-4 w-64 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <select
        className="border p-2 ml-4 rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Paused">Paused</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Selected count */}
      <div className="mb-4 text-sm text-gray-600">
        Selected Campaigns: {selectedCampaigns.length}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3"></th>

            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Status</th>

            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Budget
            </th>

            <th className="p-3 text-left">Impressions</th>
          </tr>
        </thead>

        <tbody>
          {currentCampaigns.map((campaign) => (
            <tr key={campaign.id} className="border-t hover:bg-gray-100">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedCampaigns.includes(campaign.id)}
                  onChange={() => {
                    if (selectedCampaigns.includes(campaign.id)) {
                      setSelectedCampaigns(
                        selectedCampaigns.filter((id) => id !== campaign.id),
                      );
                    } else {
                      setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                    }
                  }}
                />
              </td>

              <td className="p-3">
                <Link to={`/campaign/${campaign.id}`} className="text-blue-600">
                  {campaign.name}
                </Link>
              </td>

<td className="p-3">

  <span className="mr-3">{campaign.status}</span>

  <button
    className="text-blue-500 underline"
    onClick={() => updateCampaignStatus(campaign.id)}
  >
    Toggle
  </button>

</td>
              <td className="p-3">${campaign.budget}</td>

              <td className="p-3">{campaign.impressions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="flex gap-3 mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
