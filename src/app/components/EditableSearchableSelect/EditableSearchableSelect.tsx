import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, QueryErrorResetBoundary } from "@tanstack/react-query";
import { GraphQLBackend } from "@/lib/api/graphql"; // Adjust the path as per your setup
import styles from "./EditableSearchableSelect.module.scss";

interface EditableSearchableSelectProps {
  name: string;
  placeholder: string;
  queryKey: "brands" | "models" | "modifications";
  selectedId?: string; // brandId or modelId, depending on the context
  selectedModificationID?: string;
  onChange: (value: string, name: string) => void;
  disabled? : boolean
}

const EditableSearchableSelect: React.FC<EditableSearchableSelectProps> = ({
  name,
  placeholder,
  queryKey,
  selectedId,
  onChange,
  selectedModificationID,
  disabled
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<{ id: string; name: string }[]>([]);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement | null>(null); 

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
    enabled: queryKey === "brands" || Boolean(selectedId) || queryKey === "models",
  });

  useEffect(() => {
    if (data) {
      let initialOption;

      // Check which ID we should use for setting the initial selected name
      if (queryKey === "modifications" && selectedModificationID) {
        initialOption = data.find((option) => option.id === selectedModificationID);
      } else if (selectedId) {
        initialOption = data.find((option) => option.id === selectedId);
      }
  
      // Set the selected name if we found a matching option
      if (initialOption) {
        setSelectedName(initialOption.name);
        setInputValue(""); // Clear the input
      }
    }
  }, [data, selectedId, selectedModificationID, queryKey]);
  
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


  useEffect(() => {
    if(selectedId && queryKey === 'models') {
      setSelectedName('');
      setInputValue("");
    }
    if (!selectedId) {
      setSelectedName('');
      setInputValue("");  
    }
  }, [selectedId]);


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
      let newId: string | undefined;
      let newName: string | undefined;
  
      if ("createCarBrand" in createdData) {
        newId = createdData.createCarBrand.id;
        newName = createdData.createCarBrand.name;
      } else if ("createCarModel" in createdData) {
        newId = createdData.createCarModel.id;
        newName = createdData.createCarModel.name;
      } else if ("createCarModification" in createdData) {
        newId = createdData.createCarModification.id;
        newName = createdData.createCarModification.name;
      }
  
      if (newId && newName) {
        setSelectedName(newName);
        setInputValue(""); 
        setShowCreateButton(false);
        onChange(newId, newName); 
        refetch(); 
      }
    },
  });
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelectedName(""); 
    setShowDropdown(true); 
  };

  const handleOptionClick = (option: { id: string; name: string }) => {
    onChange(option.id, name);
    setSelectedName(option.name);
    setInputValue(""); 
    setShowDropdown(false);
  };

  const handleCreate = () => {
    if (inputValue) {
      createNewEntry(inputValue);
      setShowDropdown(false); 
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      
      <input
        type="text"
        placeholder={`Search or add ${placeholder.toLowerCase()}`}
        value={selectedName || inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus} 
        className={styles.input}
        disabled={disabled}
      />

      {showDropdown && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={styles.option}
              >
                {option.name}
              </div>
            ))
          )}
          {showCreateButton && (
            <button
              type="button"
              onClick={handleCreate}
              className={styles.createButton}
            >
              + Create "{inputValue}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableSearchableSelect;