import { Select } from "antd"

interface FilterProps {
  setOpenAddModal: (open: boolean) => void
  setSearch: (search: string) => void
  setState: (state: string) => void
}

export default function Filter({
  setOpenAddModal,
  setSearch,
  setState,
}: FilterProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <div>
            <input
              className="w-full focus-visible:outline-none border-x border-y border-gray-400 rounded-lg px-2 py-1 focus:border-[#068FFF]"
              type="text"
              placeholder="search name"
              onChange={handleInput}
            />
          </div>
          <div>
            <Select
              className="w-[110px]"
              defaultValue="All"
              onChange={setState}
              options={[
                { value: "All", label: "All" },
                { value: "Complete", label: "Complete" },
                { value: "Incomplete", label: "Incomplete" },
              ]}
            />
          </div>
        </div>
        <div>
          <button
            className=" px-3 py-1 rounded-md bg-[#068FFF] text-white"
            onClick={() => setOpenAddModal(true)}
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}
