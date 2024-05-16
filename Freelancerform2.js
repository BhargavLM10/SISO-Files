import React, { useState } from 'react';

const Freelancerform2 = () => {
    const [formData, setFormData] = useState({
        specialization: '',
        specializationLevel: '',
        certified: '',
        aboutMe: null,
        pricing: '',
        price: 0
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'aboutMe' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const form = new FormData();
            for (let key in formData) {
                form.append(key, formData[key]);
            }

            try {
                const response = await fetch('http://localhost:1998/api/siso/updateemployeedetails/AC24SISO001', {
                    method: 'PUT',
                    body: form
                });
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                console.log('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!formData.specialization.trim()) {
            errors.specialization = 'Specialization is required';
            isValid = false;
        }

        if (!formData.specializationLevel.trim()) {
            errors.specializationLevel = 'Specialization Level is required';
            isValid = false;
        }

        if (!formData.certified.trim()) {
            errors.certified = 'Certified field is required';
            isValid = false;
        }

        if (!formData.aboutMe) {
            errors.aboutMe = 'About Me file is required';
            isValid = false;
        }

        if (!formData.pricing.trim()) {
            errors.pricing = 'Pricing is required';
            isValid = false;
        }

        if (formData.price <= 0) {
            errors.price = 'Price must be greater than zero';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div style={{backgroundImage:'url(" https://img.freepik.com/premium-photo/diversity-equity-inclusion-concept-kids_916191-53198.jpg?w=740")',backgroundSize:'cover',padding:'20px'}}>
    
        <div  style={{padding:'30px'}}>
            <h2 style={{fontFamily:'helvectia',fontStyle:'italic',textAlign:'center'}}>Create or Update Profile</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" style={{marginLeft:'350px'}} >
                <div className="form-group">
                    <label htmlFor="specialization" style={{color:'brown'}}>Specialization:</label>
                    <select style={{width:'600px',borderColor:'black'}} type="text" className="form-control" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} required >
                        <option>Choose Specialization</option>
                        <option>UI/UX</option>
                        <option>REACT JS</option>
                        <option>JAVA</option>

                    </select>
                    {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="specializationLevel" style={{color:'brown'}}>Specialization Level:</label>
                    <select  style={{width:'600px',borderColor:'black'}} type="text" className="form-control" id="specializationLevel" name="specializationLevel" value={formData.specializationLevel} onChange={handleChange} required >
                        <option>Choose Level </option>
                        <option>Beginner</option>
                        
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        
                        
                        </select>
                    {errors.specializationLevel && <div className="invalid-feedback">{errors.specializationLevel}</div>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="certified" style={{color:'brown'}}>Certified:</label>
                    <select  style={{width:'600px',borderColor:'black'}} type="text" className="form-control" id="certified" name="certified" value={formData.certified} onChange={handleChange} required >
                        <option>Choose Certification </option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    {errors.certified && <div className="invalid-feedback">{errors.certified}</div>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="aboutMe" style={{color:'brown'}}>About Me:</label><br></br>
                    <input type="file" className="form-control-file" id="aboutMe" name="aboutMe" onChange={handleChange} required />
                    {errors.aboutMe && <div className="invalid-feedback">{errors.aboutMe}</div>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="pricing" style={{color:'brown'}}>Pricing:</label>
                    <select  style={{width:'600px',borderColor:'black'}} type="text" className="form-control" id="pricing" name="pricing" value={formData.pricing} onChange={handleChange} required >
                        <option>Choose Pricing</option>
                        <option>Hourly</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>

                    </select>
                    {errors.pricing && <div className="invalid-feedback">{errors.pricing}</div>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="price" style={{color:'brown'}}>Price:</label>
                    <input  style={{width:'600px',borderColor:'black'}} type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div><br/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    
    );
};

export default Freelancerform2;
