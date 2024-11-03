import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GraphQLBackend } from "@/lib/api/graphql"; // Adjust the path as per your setup

interface EditableSearchableSelectProps {
  name: string;
  placeholder: string;
  queryKey: "brands" | "models" | "modifications";
  selectedId?: string; // brandId or modelId, depending on the context
  onChange: (value: string) => void;
}

const EditableSearchableSelect: React.FC<EditableSearchableSelectProps> = ({
  name,
  placeholder,
  queryKey,
  selectedId,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<{ id: string; name: string }[]>([]);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [selectedName, setSelectedName] = useState(""); // Holds the name of the selected or created item
  const [showDropdown, setShowDropdown] = useState(false); // Controls dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown container

  // Fetch options based on queryKey and selectedId
  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKey, selectedId],
    queryFn: async () => {
      switch (queryKey) {
        case "brands":
          const brandsResponse = await GraphQLBackend.GetBrands();
          return brandsResponse.carBrands;
        case "models":
          if (selectedId) {
            const modelsResponse = await GraphQLBackend.FetchCarModels({
              brandId: selectedId,
            });
            return modelsResponse.carModels;
          }
          return [];
        case "modifications":
          if (selectedId) {
            const modificationsResponse = await GraphQLBackend.FetchCarModificationsByModel({
              modelId: selectedId,
            });
            return modificationsResponse.carModifications;
          }
          return [];
        default:
          return [];
      }
    },
    enabled: queryKey === "brands" || Boolean(selectedId),
  });

  // Update filtered options when data or inputValue changes
  useEffect(() => {
    if (data) {
      const matchingOptions = data.filter((option: { name: string }) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(matchingOptions);
      setShowCreateButton(matchingOptions.length === 0 && inputValue !== "");
    }
  }, [data, inputValue]);

  // Mutation to create a new entry
  const { mutate: createNewEntry } = useMutation({
    mutationFn: async (newEntryName: string) => {
      switch (queryKey) {
        case "brands":
          return await GraphQLBackend.CreateCarBrand({ name: newEntryName });
        case "models":
          return await GraphQLBackend.CreateCarModel({
            brandId: selectedId || "",
            name: newEntryName,
          });
        case "modifications":
          return await GraphQLBackend.CreateCarModification({
            modelId: selectedId || "",
            name: newEntryName,
          });
      }
    },
    onSuccess: (createdData) => {
      // Extract the correct response data based on the mutation type
      let newId: string | undefined;
      let newName: string | undefined;
  
      if ('createCarBrand' in createdData) {
        newId = createdData.createCarBrand.id;
        newName = createdData.createCarBrand.name;
      } else if ('createCarModel' in createdData) {
        newId = createdData.createCarModel.id;
        newName = createdData.createCarModel.name;
      } else if ('createCarModification' in createdData) {
        newId = createdData.createCarModification.id;
        newName = createdData.createCarModification.name;
      }
  
      if (newId && newName) {
        // Update the input with the new value
        setSelectedName(newName);
        setInputValue(""); // Clear input field
        setShowCreateButton(false);
  
        onChange(newId); // Send the new ID back to the parent component
        refetch(); // Refetch options to include the new entry
      }
    },
  });
  

  // Handle input change and filter options
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelectedName(""); // Clear selected name when typing a new input
    setShowDropdown(true); // Show dropdown when typing
  };

  // Handle select change
  const handleOptionClick = (option: { id: string; name: string }) => {
    onChange(option.id);
    setSelectedName(option.name); // Update the input to show the selected option's name
    setInputValue(""); // Clear the temporary input value
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Handle create button click
  const handleCreate = () => {
    if (inputValue) {
      createNewEntry(inputValue);
      setShowDropdown(false); // Hide dropdown after creation
    }
  };

  // Toggle dropdown visibility on input focus
  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px", position: "relative" }} ref={dropdownRef}>
      
      <input
        type="text"
        placeholder={`Search or add ${placeholder.toLowerCase()}`}
        value={selectedName || inputValue} // Show the selected name or the input value
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Show dropdown on focus
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "4px",
        }}
      />

      {/* Only show dropdown if showDropdown is true and there are filtered options */}
      {showDropdown && filteredOptions.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            position: "absolute",
            top: "100%",
            backgroundColor: "#fff",
            zIndex: 1,
            width: "100%",
          }}
        >
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      {/* Show create button only if showDropdown is true, there are no filtered options, and input is non-empty */}
      {showDropdown && showCreateButton && (
        <button
          type="button"
          onClick={handleCreate}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "8px",
            borderRadius: "4px",
            border: "none",
            marginTop: "4px",
            cursor: "pointer",
          }}
        >
          + Create "{inputValue}"
        </button>
      )}
    </div>
  );
};

export default EditableSearchableSelect;
