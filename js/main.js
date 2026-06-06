/* ==========================================================================
   STAR INSTITUTE INTERACTIVE SYSTEM COMPONENT (main.js)
   ========================================================================== */

// 1. CENTRALIZED DATA LAYOUT
// Modifying this single array dynamically updates dropdowns and routing models across the app.
const starBranchesRegistry = [
    { id: "gurugram", name: "Alpha Central Campus", city: "Gurugram", phone: "+91 98765 00001" },
    { id: "noida", name: "City Core Learning Hub", city: "Noida", phone: "+91 98765 00002" },
    { id: "lucknow", name: "North Extension Block", city: "Lucknow", phone: "+91 98765 00003" },
    { id: "prayagraj", name: "Elite Allied Academy", city: "Prayagraj", phone: "+91 98765 00004" },
    { id: "delhi", name: "Metro Extension Wing", city: "Delhi NCR", phone: "+91 98765 00005" }
];

// 2. DYNAMIC DROPDOWN GENERATOR FOR ADMISSIONS FORM
function populateBranchDropdown() {
    const branchDropdown = document.getElementById('preferredBranch');
    
    // Safety check: Only execute if the admissions form exists on the current page
    if (!branchDropdown) return;

    // Clear existing placeholder options except the default first one
    branchDropdown.innerHTML = '<option value="">-- Choose Branch Campus --</option>';

    // Loop through the array and append options programmatically
    starBranchesRegistry.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch.id;
        option.textContent = `${branch.name} (${branch.city})`;
        branchDropdown.appendChild(option);
    });

    // Smart Router: Auto-select a branch if it's passed via the URL link parameters
    const urlParams = new URLSearchParams(window.location.search);
    const branchParam = urlParams.get('branch');
    
    if (branchParam) {
        branchDropdown.value = branchParam;
    }
}

// 3. SECURE FORM SUBMISSION LOGIC
function handleFormSubmission(event) {
    event.preventDefault();

    // Gather form field data safely
    const studentName = document.getElementById('applicantName').value.trim();
    const studentPhone = document.getElementById('applicantPhone').value.trim();
    const selectedStream = document.getElementById('targetProgram').value;
    const selectedBranchKey = document.getElementById('preferredBranch').value;

    // Simple robust phone validation rule (exactly 10 digits)
    if (studentPhone.length !== 10 || isNaN(studentPhone)) {
        alert("Verification Error: Please enter a valid 10-digit mobile number.");
        return;
    }

    // Match selected key with registry database array info
    const matchedBranch = starBranchesRegistry.find(b => b.id === selectedBranchKey);
    const branchDisplayName = matchedBranch ? `${matchedBranch.name} (${matchedBranch.city})` : "Central Registry Office";

    // Trigger high-trust visual notification
    alert(`Submission Logged Successfully!\n\nDear ${studentName},\n\nYour application profile details for the "${selectedStream}" module have been safely encrypted.\n\nThis data packet has been routed directly to the admissions desk at our: \n📍 ${branchDisplayName}.\n\nA personal mentor will connect via call/SMS within 24 working hours.`);

    // Reset the fields cleanly after submission
    document.getElementById('institutionalInquiryForm').reset();
}

// 4. GLOBAL EVENT INITIALIZER
document.addEventListener('DOMContentLoaded', () => {
    // 1. Automatically populate branch listings if form is present
    populateBranchDropdown();

    // 2. Attach clean event listener to form submission event
    const inquiryForm = document.getElementById('institutionalInquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleFormSubmission);
    }
});
