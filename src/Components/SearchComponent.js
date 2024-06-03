import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import debounce from "lodash.debounce";

// Function to fetch colleges based on a search query
const fetchColleges = async (searchQuery) => {
  try {
    const response = await axios.get(
      `http://universities.hipolabs.com/search?name=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching colleges");
  }
};

// Function to fetch the logo of a college based on its domain
const fetchLogo = async (domain) => {
  try {
    const response = await axios.get(`https://logo.clearbit.com/${domain}`);
    return response.status === 200 ? response.config.url : null;
  } catch {
    throw new Error("Error fetching logo");
  }
};

const SearchComponent = () => {
  // State to hold the list of colleges
  const [colleges, setColleges] = useState([]);
  // State to hold the currently selected college
  const [selectedCollege, setSelectedCollege] = useState(null);
  // State to hold the logo URL of the selected college
  const [logo, setLogo] = useState(null);
  // State to indicate whether data is being loaded
  const [loading, setLoading] = useState(false);
  // State to hold error messages
  const [error, setError] = useState(null);

  // useEffect to load the list of colleges when the component mounts
  useEffect(() => {
    const loadColleges = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchColleges("");
        setColleges(result);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadColleges();
  }, []);

  // Function to handle search input changes, debounced to limit API calls
  const handleSearch = debounce(async (event, value) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchColleges(value);
      setColleges(result);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, 500);

  // Function to handle college selection from the dropdown
  const handleCollegeSelect = async (event, value) => {
    setSelectedCollege(value);
    setLogo(null);
    setError(null);
    if (value) {
      const domain = value.domains[0];
      try {
        const logoUrl = await fetchLogo(domain);
        setLogo(logoUrl);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      {/* Autocomplete component for searching and selecting colleges */}
      <Autocomplete
        options={colleges}
        getOptionLabel={(option) => option.name}
        onInputChange={handleSearch}
        onChange={handleCollegeSelect}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select College"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        style={{ marginTop: 20 }}
      />
      {selectedCollege && (
        <Card style={{ marginTop: 20, display: "flex", alignItems: "center" }}>
          {/* Display the logo if available */}
          {logo ? (
            <CardMedia
              component="img"
              style={{
                width: 100,
                height: 100,
                objectFit: "contain",
                margin: 16,
              }}
              image={logo}
              alt={`${selectedCollege.name} logo`}
            />
          ) : (
            <Typography style={{ margin: 16 }}>Logo not available</Typography>
          )}
          <CardContent>
            {/* Display the selected college's name and country */}
            <Typography variant="h5">{selectedCollege.name}</Typography>
            <Typography variant="subtitle1">
              {selectedCollege.country}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SearchComponent;
